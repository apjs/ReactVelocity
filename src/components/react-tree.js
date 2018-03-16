import React, { Component } from 'react';
import { render } from 'react-dom';
import 'react-sortable-tree/style.css';
import SortableTree, { addNodeUnderParent ,removeNodeAtPath, changeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import MenuItem from 'material-ui/MenuItem';
import ReactInterface from './react-interface';
import { generateCode } from '../../generateContents/react-generate-content';
import JSZip from 'jszip';
const zip = new JSZip();

class ReactTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{
        name: 'App',
        parent: true,
        isStateful: true,
      }],
      flattenedData: ['App'],
      textFieldValue: '',
      flattenedArray: [],
      error: '',
      version2: {},
      isToggleOn: true,
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
    this.toggleStateButton = this.toggleStateButton.bind(this);
  }

  stateful(node,path,getNodeKey) {
    if (!('isStateful' in node)) {
    this.setState(state => ({
       treeData: changeNodeAtPath({
         treeData: state.treeData,
         path,
         getNodeKey,
         newNode: { ...node, isStateful:true }
       })
     }))
   }
   }

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

  updateFlattenedData() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    const flattenedArray = flatteningNestedArray.map(ele => {
      return ele.node.name
    });
    this.setState(state => ({
      flattenedData: flattenedArray,
      flattenedArray: flatteningNestedArray,
      textFieldValue: '',
    }))
  }

  onButtonPress(){
    this.concatNewComponent();
    // using setTimeout breaks binding, so use a variable to store this to give to the function when it runs
    const that = this;
    setTimeout(function(){that.updateFlattenedData()},100);
  };

  onKeyPress(e) {
    if(e.key == 'Enter') {
      this.concatNewComponent();
      // using setTimeout breaks binding, so use a variable to store this to give to the function when it runs
      const that = this;
      setTimeout(function(){that.updateFlattenedData()},100);
    }
  }

  createCodeForGenerateContent() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    let flattenedVar = flatteningNestedArray;
    let version1 = [];
    let version2 = {};
    for(let i = 0; i<flattenedVar.length; i++) {

      let val = (flattenedVar[i].parentNode) ? flattenedVar[i].parentNode.name : null;
      version1.push([flattenedVar[i].node.name, val]);
    }

    for (let i=0; i< version1.length; i++) {
      let subArr = version1[i];
      let lastElem = subArr[subArr.length-1];
      let firstElem = subArr[0];
      if (!version2[firstElem]) {
        version2[firstElem] = null;
      }
      if (version2.hasOwnProperty(lastElem) && version2[lastElem] === null) {
        version2[lastElem] = subArr.slice(0, -1);
      } else if (version2.hasOwnProperty(lastElem) && version2[lastElem] !== null) {
        version2[lastElem] = version2[lastElem].concat(subArr.slice(0, -1));
    }

    this.setState({
      version2: version2,
    });
  }
}
  handleExport() {
    const files = generateCode(this.state.version2);
    let fileNames = Object.keys(files);
    for (let i=0; i<fileNames.length;i++) {
      zip.file(fileNames[i] + '.js', files[fileNames[i]], {base64: false})
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

  componentDidMount() {
    this.updateFlattenedData();
  }

  toggleStateButton() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    let isStateful = true;
    const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
      if (node.parent) {
        return false;
      }
      return true;
    };

    return (
      <div>
        <ReactInterface
          treeData={this.state.treeData}
          flattenedData={this.state.flattenedData}
          textFieldValue={this.state.textFieldValue}
          flattenedArray = {this.state.flattenedArray}
          error={this.state.error}
          formatName={this.formatName}
          handleTextFieldChange={this.handleTextFieldChange}
          updateFlattenedData={this.updateFlattenedData}
          onButtonPress={this.onButtonPress}
          onKeyPress={this.onKeyPress}
          exportZipFiles={this.exportZipFiles}/>
        <div style={{ height: 700 }}>
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
              stateful: this.stateful(node,path,getNodeKey),
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
