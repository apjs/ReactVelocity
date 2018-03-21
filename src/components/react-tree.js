import React, { Component } from 'react';
import { render } from 'react-dom';
import 'react-sortable-tree/style.css';
import SortableTree, { addNodeUnderParent ,removeNodeAtPath, changeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import MenuItem from 'material-ui/MenuItem';
import {cyan100} from 'material-ui/styles/colors';
import ReactInterface from './react-interface';
import generateCode from '../../generateContents/react-generate-content';
import generateIndexHTML from '../../generateContents/index-html';
import generatePresentationalComponent from '../../generateContents/react-generate-stateless-component';
import JSZip from 'jszip';

const zip = new JSZip();

class ReactTree extends Component {
  constructor(props) {
    super(props);
/*
  treeData is boilerplate from react-sortable-tree that deals with the tree's
  organization. treeData is an array of deeply nested objects.
*/
    this.state = {
      treeData: [{
        name: 'App',
        //Parent is for canDrop and dictates that parents CANT be drag/dropped.
        parent: true,
        //isStateful defaults App component only to "stateful".
        isStateful: true,
      }],
      textFieldValue: '',
      /*
        flattenedArray takes the treeData and a helper function called
        getFlatDataFromTree and returns treeData as a flattened Array.
      */
      flattenedArray: [],
      /*
        The empty string for error is for all MaterialUI text fields so that
        they don't automatically return an error message.
      */
      error: '',
      /*
        Version2 is an object with key value pairs where the key is the name of
        the file we are zipping and the value is the code belonging to that file.
      */
      version2: {},
    };
    this.stateful = this.stateful.bind(this);
    this.formatName = this.formatName.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.concatNewComponent = this.concatNewComponent.bind(this);
    this.updateFlattenedData = this.updateFlattenedData.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.createCodeForGenerateContent = this.createCodeForGenerateContent.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.exportZipFiles = this.exportZipFiles.bind(this);
  }

/*
  stateful() generates an "isStateful" property on all components except App
  and defaults the stateful/stateless button to "stateless".
*/
  stateful(node,path,getNodeKey) {
    if (!('isStateful' in node)) {
      this.setState(state => ({
        treeData: changeNodeAtPath({
          treeData: state.treeData,
          path,
          getNodeKey,
        newNode: { ...node, isStateful:false }
        })
      }))
    }
  }
/*
  formatName() is for sanitization of user input for naming react components
  using industry standard practice.
*/
  formatName(textField) {
    let scrubbedResult = textField
    // Capitalize first letter of string.
    //| ^ = beginning of output | . = 1st char of str |
    .replace(/^./g, x => x.toUpperCase())
    // Capitalize first letter of each word and removes spaces.
    //| \ = matches | \w = any alphanumeric | \S = single char except white space
    //| * = preceeding expression 0 or more times | + = preceeding expression 1 or more times |
    .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);})
    .replace(/\ +/g, x => '')
    // Remove appending file extensions like .js or .json.
    //| \. = . in file extensions | $ = end of input |
    .replace(/\..+$/, '');
    return scrubbedResult;
  }

  handleTextFieldChange(e){
    this.setState({
      textFieldValue: e.target.value,
    });
  }

/*
  concatNewComponent() is run when a user clicks "add child" or hits "Enter" when
  inside the textfield. It adds a new node to treeData with the name of the
  value of the textfield. If there is nothing written in the textfield, it
  returns an error message.
*/
  concatNewComponent() {
    if(this.state.textFieldValue !== '') {
      this.setState(state => ({
        treeData: state.treeData.concat({
          name: this.formatName(this.state.textFieldValue),
        }),
        error: "",
      }))
    } else {(this.setState(state => ({
        error: "This field is required"
      })
    ))}
  }

/*
  Code Generation is not based off of treeData, it is based off of a flattenedArray.
  updateFlattenedData() makes sure that flattenedArray is up to date with treeData.
  textFieldValue is set to an empty string to reset the textField after you hit
  "Enter" or "Add Child".
*/
  updateFlattenedData() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    this.setState(state => ({
      flattenedArray: flatteningNestedArray,
      textFieldValue: '',
    }))
  }

/* onButtonPress() adds a new node to the treeData. concatNewComponent has to
  finish before updateFlattenedData() to ensure that updateFlattenedData knows
  about the new node. To ensure this, we put updateFlattenedData on a short
  time-out. Refer to onButtonPress for onKeyPress.
*/
  onButtonPress(){
    this.concatNewComponent();
    /* using setTimeout breaks binding, so use a variable to store this to give
       to the function when it runs
    */
    const that = this;
    setTimeout(function(){that.updateFlattenedData()},100);
  };

  onKeyPress(e) {
    if(e.key == 'Enter') {
      this.concatNewComponent();
      const that = this;
      setTimeout(function(){that.updateFlattenedData()},100);
    }
  }
/*
  For exporting zipped js files, we need an array of subArrays
  flattenedVar comes from react-sortable-tree.
*/
  createCodeForGenerateContent() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    let flattenedVar = flatteningNestedArray;
/*
  version1 is an array of sub-arrays. Within each array, the last element
  is the parent of all previous elements.
 */
    let version1 = [];
  /* For version2, the key is the parent. Value is all of the children
    stored as elements in an array.
  */
    let version2 = {};

    for(let i = 0; i<flattenedVar.length; i++) {
/*
  val is the name of the parent node. If there is no parent, then we set
  val to null. That would only be true for the eldest parent, App.
*/
      let val = (flattenedVar[i].parentNode) ? flattenedVar[i].parentNode.name : null;
      version1.push([flattenedVar[i].node.name, val]);
    }
    //iterate through our sub-arrays to get data into the version2 object
    for (let i=0; i< version1.length; i++) {
      let subArr = version1[i];
      //lastElem is the parent names.
      let lastElem = subArr[subArr.length-1];
      //firstElem is the component names.
      let firstElem = subArr[0];
      if (!version2[firstElem]) {
        version2[firstElem] = null;
      }
      //Parent is assigned a value of it's children
      if (version2.hasOwnProperty(lastElem) && version2[lastElem] === null) {
        version2[lastElem] = subArr.slice(0, -1);
      } else if (version2.hasOwnProperty(lastElem) && version2[lastElem] !== null) {
        version2[lastElem] = version2[lastElem].concat(subArr.slice(0, -1));
      }
    }
/*
  Here we add an array with a single string element of "stateful" or "stateless"
  to the value of every key. If a key's value is null, then null is replaced
  entirely by a single array of "stateful" or "stateless".
*/
    for (let i=0; i < flattenedVar.length; i++) {
      if (Array.isArray(version2[flattenedVar[i].node.name])) {
        if (flattenedVar[i].node.isStateful) {
          version2[flattenedVar[i].node.name].push(['stateful']);
        } else {
          version2[flattenedVar[i].node.name].push(['stateless']);
        }
      } else {
        version2[flattenedVar[i].node.name] = (flattenedVar[i].node.isStateful) ? [['stateful']] : [['stateless']];
      }
    }
    this.setState({
      version2: version2,
    });
  }


  handleExport() {
    let { version2 } = this.state;
    let stateful = generateCode(version2);
    let stateless = generatePresentationalComponent(version2);
    let allComponents = {...stateful, ...stateless};
    let fileNames = Object.keys(allComponents);
    const html = generateIndexHTML();
    zip.file('index.html', html, {base64: false});
    for (let i=0; i<fileNames.length;i++) {
      zip.folder('components').file(fileNames[i] + '.js', allComponents[fileNames[i]], {base64: false})
    }
      zip.generateAsync({type:"base64"}).then(function (base64) {
      location.href="data:application/zip;base64," + base64;
    });
  }

  exportZipFiles() {
    this.createCodeForGenerateContent();
    const that = this;
    setTimeout(() => {that.handleExport()}, 100);
  }

  render() {

    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flattenedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    console.table('dubovsky is...', flattenedArray);
    let isStateful = true;
    const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
      if (node.parent) {
        return false;
      }
      return true;
    };

    return (
      <div style={{
        backgroundColor: cyan100,
      }} >
        <ReactInterface
          treeData={this.state.treeData}
          textFieldValue={this.state.textFieldValue}
          flattenedArray = {this.state.flattenedArray}
          error={this.state.error}
          formatName={this.formatName}
          handleTextFieldChange={this.handleTextFieldChange}
          updateFlattenedData={this.updateFlattenedData}
          onButtonPress={this.onButtonPress}
          onKeyPress={this.onKeyPress}
          exportZipFiles={this.exportZipFiles}/>
        <div style={{ height: 1800 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            canDrop={canDrop}
            generateNodeProps={({ node, path }) => ({
              title: (
                <input
                  style={{ fontSize: '1.1rem' }}
                  value={this.formatName(node.name)}
                  onChange={event => {
                    const name = event.target.value;
                    this.setState(state => ({
                      treeData: changeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                        newNode: { ...node, name },
                      }),
                    }));
                  }}
                />
              ),
              // stateful: this.stateful(node,path,getNodeKey),
              buttons: [
                <button onClick={()=> {
                  node.isStateful ? isStateful = false : isStateful = true;
                  this.setState(state => ({
                    treeData: changeNodeAtPath({
                      treeData: state.treeData,
                      path,
                      getNodeKey,
                      newNode: { ...node, isStateful:isStateful },
                    }),
                  }))
                }}>{node.isStateful ? 'Stateful' : 'Stateless'}</button>,
                <button
                onClick={() =>
                  this.setState(state => ({
                    treeData: addNodeUnderParent({
                      treeData: state.treeData,
                      parentKey: path[path.length - 1],
                      expandParent: true,
                      getNodeKey,
                      newNode: {
                        name: '',
                      },
                    }).treeData,
                }))
              }
              >
                Add Child
              </button>,
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }))
                  }
                >
                  X
                </button>,
              ],
            })}
          />
        </div>
      </div>
    );
  }
}

export default ReactTree;
