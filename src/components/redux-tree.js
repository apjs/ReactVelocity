//add an onclick to the export button to update the flattened array
//that way the flattenedata array is up to date


import React, { Component } from 'react';
import { render } from 'react-dom';
import 'react-sortable-tree/style.css';
import SortableTree, { addNodeUnderParent ,removeNodeAtPath, changeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import MenuItem from 'material-ui/MenuItem';
import ReduxInterface from './redux-interface';
import generateReduxIndexJS from './../../generateContents/redux-index';
import generateIndexHTML from './../../generateContents/index-html';
import generateActionCreators from './../../generateContents/redux-generate-action-creators';
import generateReducers from './../../generateContents/redux-generate-reducers';
import generateComponents from './../../generateContents/redux-generate-components';
import generatePresentationalComponent from './../../generateContents/react-generate-stateless-component';
import generateContainer from './../../generateContents/redux-generate-container';
import {deepPurple100} from 'material-ui/styles/colors';
import JSZip from 'jszip';
const zip = new JSZip();

class ReduxTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { name: 'action', defaultType: '', parent: true},
        { name: 'reducer', defaultType: '', parent: true},
        { name: 'container/component', defaultType: '', parent: true, expanded: true, children: [ { name: 'App', componentType: 'Container', parent: true } ]}],
      value: 'Action',
      actionName: '',
      actionType: '',
      reducerName: '',
      reducerCase: '',
      componentName: '',
      containerName: '',
      actionError: '',
      reducerNameError: '',
      reducerCaseError: '',
      componentNameError: '',
      containerNameError: '',
      flattenedArray: [],
      version2: {},
      parents: [],
      radioButtonState: false,
    };
    this.camelCaseFormat = this.camelCaseFormat.bind(this);
    this.capitalizeFirstLetterOfEachWord = this.capitalizeFirstLetterOfEachWord.bind(this);
    this.allCapSnakeCaseFormat = this.allCapSnakeCaseFormat.bind(this);
    this.actionHandleTextFieldChange = this.actionHandleTextFieldChange.bind(this);
    this.reducerNameHandleTextFieldChange = this.reducerNameHandleTextFieldChange.bind(this);
    this.reducerCaseHandleTextFieldChange = this.reducerCaseHandleTextFieldChange.bind(this);
    this.componentNameHandleTextFieldChange = this.componentNameHandleTextFieldChange.bind(this);
    this.containerNameHandleTextFieldChange = this.containerNameHandleTextFieldChange.bind(this);
    this.chooseFileType = this.chooseFileType.bind(this);
    this.concatNewComponent = this.concatNewComponent.bind(this);
    this.updateFlattenedData = this.updateFlattenedData.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.createCodeForGenerateContent = this.createCodeForGenerateContent.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.exportZipFiles = this.exportZipFiles.bind(this);
    this.toggleStateButton = this.toggleStateButton.bind(this);
    this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
    this.reducerCaseToArray = this.reducerCaseToArray.bind(this);
    this.radioButtonChecked = this.radioButtonChecked.bind(this);
  }

  camelCaseFormat(textField) {
    let scrubbedResult = textField
    // Capitalize first letter of each word and removes spaces.
    //| \ = matches | \w = any alphanumeric | \S = single char except white space
    //| * = preceeding expression 0 or more times | + = preceeding expression 1 or more times |
    .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);})
    .replace(/\ +/g, x => '')
    // Capitalize first letter of string.
    //| ^ = beginning of output | . = 1st char of str |
    .replace(/^./g, x => x.toLowerCase())
    // Remove appending file extensions like .js or .json.
    //| \. = . in file extensions | $ = end of input |
    .replace(/\..+$/, '');
    return scrubbedResult;
  }

  capitalizeFirstLetterOfEachWord(textField) {
    let scrubbedResult = textField
    .replace(/^./g, x => x.toUpperCase())
    .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);})
    .replace(/\ +/g, x => '')
    .replace(/\..+$/, '');
    return scrubbedResult;
  }

  allCapSnakeCaseFormat(textField) {
    let scrubbedResult = textField
      .replace(/\w\S*/g, function(txt){return '_' + txt.substr(0);})
      .replace(/\ +/g, x => '')
      .replace(/^_/g, x => '')
      .replace(/\w/g, x => x.toUpperCase())
    return scrubbedResult;
  }

  reducerCaseToArray(textfield){
    let splitTextField = textfield.split(/,/)
    let scrubbedArray = splitTextField.map(ele => {
      return this.allCapSnakeCaseFormat(ele)
    })
    return scrubbedArray;
  }

  actionHandleTextFieldChange(e){
    this.setState({
      actionName: e.target.value,
      actionType: e.target.value,

    });
  }

  reducerNameHandleTextFieldChange(e){
    this.setState({
      reducerName: e.target.value,
    });
  }

  reducerCaseHandleTextFieldChange(e){
    this.setState({
      reducerCase: e.target.value,
    });
  }

  componentNameHandleTextFieldChange(e){
    this.setState({
      componentName: e.target.value,
    });
  }

  containerNameHandleTextFieldChange(e){
    this.setState({
      containerName: e.target.value,
    });
  }

  chooseFileType() {
    if (this.state.value === "Action") {
      return "Action"
    }
    if (this.state.value === "Reducer") {
      return "Reducer"
    }
    if (this.state.value === "Container") {
      return "Container"
    }
    if (this.state.value === "Component") {
      return "Component"
    }
  }

  concatNewComponent() {
    if(this.state.actionName !== '' && this.state.actionType !== '' && this.state.value === 'Action' ) {
      this.setState(state => ({
        treeData: state.treeData.concat({
          name: this.camelCaseFormat(this.state.actionName),
          type: this.allCapSnakeCaseFormat(this.state.actionType),
          componentType: this.chooseFileType(),
        }),
        actionError: "",
      }))
    } else if(this.state.reducerName !== '' && this.state.reducerCase !== '' && this.state.value === 'Reducer' ) {
      this.setState(state => ({
        treeData: state.treeData.concat({
          name: this.camelCaseFormat(this.state.reducerName),
          case: this.reducerCaseToArray(this.state.reducerCase),
          componentType: this.chooseFileType(),
        }),
        reducerNameError: "",
        reducerCaseError: "",
      }))
    } else if(this.state.componentName !== '' && this.state.value === 'Component' ) {
      this.setState(state => ({
        treeData: state.treeData.concat({
          name: this.capitalizeFirstLetterOfEachWord(this.state.componentName),
          isStateful: this.state.radioButtonState,
          componentType: this.chooseFileType(),
        }),
        componentNameError: "",
      }))
    } else if(this.state.containerName !== '' && this.state.value === 'Container' ) {
      this.setState(state => ({
        treeData: state.treeData.concat({
          name: this.capitalizeFirstLetterOfEachWord(this.state.containerName),
          componentType: this.chooseFileType(),
        }),
        containerNameError: "",
      }))
    } else if (this.state.value === 'Action'){(
        this.setState(state => ({
          actionError: "This field is required."
      })
    ))} else if (this.state.value === 'Reducer'){(
          this.setState(state => ({
            reducerNameError: "These fields are required.",
            reducerCaseError: "These fields are required."
      })
    ))} else if (this.state.value === 'Component'){(
          this.setState(state => ({
            componentNameError: "This field is required.",
      })
    ))} else if (this.state.value === 'Container'){(
          this.setState(state => ({
            containerNameError: "This field is required.",
      })
    ))}
  }

  updateFlattenedData() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    this.setState(state => ({
      flattenedArray: flatteningNestedArray,
      actionName: '',
      actionType: '',
      reducerName: '',
      reducerCase: '',
      componentName: '',
      containerName: '',
    }))
  }

  onButtonPress(){
    this.concatNewComponent();
    // using setTimeout breaks binding, so use a variable to store this to give to the function when it runs
    const that = this;
    setTimeout(function(){that.updateFlattenedData()},100);
  };

  onKeyPress(e) {
    if(e.key === 'Enter') {
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
    }

    for (let i=0; i < flattenedVar.length; i++) {
      if (flattenedVar[i].node.name === 'Action' || flattenedVar[i].node.name === 'Container/Component' || flattenedVar[i].node.name === 'Reducer') {
        continue;
      }
      if (Array.isArray(version2[flattenedVar[i].node.name])) {
        if (flattenedVar[i].node.isStateful === 'true') {
          version2[flattenedVar[i].node.name].push(['stateful']);
        } else if (flattenedVar[i].node.componentType === 'Container') {
          version2[flattenedVar[i].node.name].push(['container']);
        } else if (flattenedVar[i].node.isStateful === 'false') {
          version2[flattenedVar[i].node.name].push(['stateless']);
        }
      } else {
        if (flattenedVar[i].node.isStateful === 'true') {
          version2[flattenedVar[i].node.name] = [['stateful']];
        } else if (flattenedVar[i].node.componentType === 'Container') {
          version2[flattenedVar[i].node.name] = [['container']];
        } else {
          version2[flattenedVar[i].node.name] = [['stateless']];
        }
      }

    }

    this.setState({
      version2: version2,
    });
  }


handleExport() {
  let { version2 } = this.state;
  const getNodeKey = ({ treeIndex }) => treeIndex;
  const flattenedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
  const index = generateReduxIndexJS();
  const html = generateIndexHTML();
  const actions = generateActionCreators(flattenedArray);
  const reducers = generateReducers(flattenedArray);
  const stateful = generateComponents(version2);
  const stateless = generatePresentationalComponent(version2);
  const components = {...stateful, ...stateless};
  const containers = generateContainer(version2);
  let fileNames = Object.keys(components);
  let fileNamesContainers = Object.keys(containers);
  zip.file('index.js', index, {base64: false});
  zip.file('index.html', html, {base64: false});
  zip.folder('actions').file('actionTypes.js', actions , {base64: false});
  zip.folder('reducers').file('reducers.js', reducers , {base64: false});
  for (let i=0; i<fileNames.length;i++) {
    if (fileNames[i][0] === fileNames[i][0].toUpperCase()) {
      zip.folder('components').file(fileNames[i] + '.js', components[fileNames[i]], {base64: false});
    }
  }
  for (let i=0; i<fileNamesContainers.length;i++) {
    if (fileNamesContainers[i][0] === fileNamesContainers[i][0].toUpperCase()) {
      zip.folder('containers').file(fileNamesContainers[i] + '.js', containers[fileNamesContainers[i]], {base64: false});
    }
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

  toggleStateButton() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  handleChangeSelectField(event, index, value) {
    this.setState({
      value,
      actionError: '',
      reducerNameError: '',
      reducerCaseError: '',
      componentNameError: '',
      containerNameError: '',
    })
  };

  radioButtonChecked(e) {
    this.setState({
      radioButtonState: e.target.value,
    });
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flattenedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
      if (node.parent) {
        return false;
      }
      return true;
    };
    return (
      <div style={{
        backgroundColor: deepPurple100,
      }}>
        <ReduxInterface
          treeData={this.state.treeData}
          value={this.state.value}
          actionName={this.state.actionName}
          actionType={this.state.actionType}
          reducerName={this.state.reducerName}
          reducerCase={this.state.reducerCase}
          componentName={this.state.componentName}
          containerName={this.state.containerName}
          flattenedArray = {this.state.flattenedArray}
          actionError={this.state.actionError}
          reducerNameError={this.state.reducerNameError}
          reducerCaseError={this.state.reducerCaseError}
          componentNameError={this.state.componentNameError}
          containerNameError={this.state.containerNameError}
          parents={this.state.parents}
          actionHandleTextFieldChange={this.actionHandleTextFieldChange}
          reducerNameHandleTextFieldChange={this.reducerNameHandleTextFieldChange}
          reducerCaseHandleTextFieldChange={this.reducerCaseHandleTextFieldChange}
          componentNameHandleTextFieldChange={this.componentNameHandleTextFieldChange}
          containerNameHandleTextFieldChange={this.containerNameHandleTextFieldChange}
          updateFlattenedData={this.updateFlattenedData}
          onButtonPress={this.onButtonPress}
          onKeyPress={this.onKeyPress}
          exportZipFiles={this.exportZipFiles}
          handleChangeSelectField={this.handleChangeSelectField}
          radioButtonChecked={this.radioButtonChecked}/>
        <div style={{ height: 700 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            canDrop={canDrop}
            generateNodeProps={({ node, path }) => ({
              title: (
                <input
                  style={{ fontSize: '1.1rem' }}
                  value={node.name}
                  onChange={event => {
                    const name = event.target.value;
                    this.setState(state => ({
                      treeData: changeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                        newNode: { ...node, name},
                      }),
                    }));
                  }}
                />
              ),
              buttons: [
                <button>
                  {node.defaultType === '' ? 'Do Not Remove' : node.componentType}
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

export default ReduxTree;
