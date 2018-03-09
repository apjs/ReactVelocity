import React, { Component } from 'react';
import { render } from 'react-dom';
import 'react-sortable-tree/style.css';
import SortableTree, { removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import Webpage from './webpage';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'App'}],
      flattenedData: ['App'],
      textFieldValue: '',
      flattenedArray: [],
      error: '',
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.concatNewComponent = this.concatNewComponent.bind(this);
    this.updateFlattenedData = this.updateFlattenedData.bind(this);
    this.formatName = this.formatName.bind(this);
  }

  concatNewComponent() {
    if(this.state.textFieldValue !== '') {
      this.setState(state => ({
      treeData: state.treeData.concat({
        title: this.formatName(this.state.textFieldValue),
      }),
      error: "",
    }))
  } else {(this.setState(state => ({
      error: "This field is required"
    })
  ))}
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

  updateFlattenedData() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    const flattenedArray = flatteningNestedArray.map(ele => {
      return ele.node.title
    });
    this.setState(state => ({
      flattenedData: flattenedArray,
      flattenedArray: flatteningNestedArray,
      textFieldValue: '',
    }))
  }
  // export const flattenVar = 1;

  onButtonPress(){
    this.concatNewComponent();
    // using setTimeout breaks binding, so use a variable to store this to give to the function when it runs
    const that = this;
    setTimeout(function(){that.updateFlattenedData()},100);
  };

  handleTextFieldChange(e){
    this.setState({
      textFieldValue: e.target.value,
    });
  }

  onKeyPress(e) {
    if(e.key == 'Enter') {
      this.concatNewComponent();
      // using setTimeout breaks binding, so use a variable to store this to give to the function when it runs
      const that = this;
      setTimeout(function(){that.updateFlattenedData()},100);
    }
  }

  componentDidMount() {
    this.updateFlattenedData();
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});

    let flattenedVar = flatteningNestedArray;
    // console.log('theprops ' + this.props.flattenedArray)
    let version1 = [];
    let version2 = {};
    for(let i = 0; i<flattenedVar.length; i++) {
      console.log(flattenedVar[i]);
      let val = (flattenedVar[i].parentNode) ? flattenedVar[i].parentNode.title : null;
      version1.push([flattenedVar[i].node.title, val]);
    }

      console.log('compnames2 ' + JSON.stringify(version1));
    for (let i=0; i< version1.length; i++) {
      let subArr = version1[i];
      let lastElem = subArr[subArr.length-1];
      let firstElem = subArr[0];
      for (let j=0; j< subArr.length; j++) {
        if (!version2[firstElem]) {
          version2[firstElem] = null;
        }
        if (version2.hasOwnProperty(lastElem) && version2[lastElem] === null) {
          version2[lastElem] = subArr.slice(0, -1);
        }
      }
    }
    console.log('HEEEEEEY', JSON.stringify(version2));


    console.log('ARRAY: ', flatteningNestedArray);
    return (
      <div>
        <Webpage
          flattenedArray = {this.state.flattenedArray}
          error={this.state.error}
          textFieldValue={this.state.textFieldValue}
          flattenedData={this.state.flattenedData}
          formatName={this.formatName}
          onButtonPress={this.onButtonPress}
          handleTextFieldChange={this.handleTextFieldChange}
          onKeyPress={this.onKeyPress}/>
        <div style={{ height: 700 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            generateNodeProps={({ node, path }) => ({
              buttons: [
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
                  Remove
                </button>,
              ],
            })}
          />
        </div>
      </div>
    );
  }
}

export default Tree;
