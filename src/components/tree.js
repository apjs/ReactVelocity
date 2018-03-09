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
    // console.table(flatteningNestedArray);
    let flattenedVar = flatteningNestedArray;
    // console.log('theprops ' + this.props.flattenedArray)
    let version1 = [];
    for(let i = 0; i<flattenedVar.length; i++) {
      // console.log(flattenedVar[i]);
      let val = (flattenedVar[i].parentNode) ? flattenedVar[i].parentNode.title : null;
      version1.push([flattenedVar[i].node.title, val]);
    }
      console.log('compnames2 ' + JSON.stringify(version1));
    return (
      <div>
        <Webpage
          updateFlattenedData={this.updateFlattenedData}
          treeData={this.state.treeData}
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
