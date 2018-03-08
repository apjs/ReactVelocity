import { render } from 'react-dom';
import 'react-sortable-tree/style.css';
import React, { Component } from 'react';
import SortableTree, { removeNodeAtPath, getFlatDataFromTree } from 'react-sortable-tree';
import Webpage from './webpage';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'App'}],
      flattenedData: ['App'],
      textFieldValue: '',
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.concatNewComponent = this.concatNewComponent.bind(this);
    this.updateFlattenedData = this.updateFlattenedData.bind(this);
  }

  concatNewComponent() {this.setState(state => ({
    treeData: state.treeData.concat({
      title: this.state.textFieldValue,
    }),
  }))
}

  updateFlattenedData() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const flatteningNestedArray = getFlatDataFromTree({treeData: this.state.treeData, getNodeKey});
    const flattenedArray = flatteningNestedArray.map(ele => {
      return ele.node.title
    });
    this.setState(state => ({
      flattenedData: flattenedArray,
    }))
  }
  
  onButtonPress(){ 
    this.concatNewComponent();
    // using setTimeout breaks binding, so use a variable to store this to give to the function when it runs
    const that = this;
    setTimeout(function(){that.updateFlattenedData()},200);
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

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div>
        <Webpage 
          flattenedData={this.state.flattenedData}
          onButtonPress={this.onButtonPress} 
          handleTextFieldChange={this.handleTextFieldChange}
          onKeyPress={this.onKeyPress}/>
        <div style={{ height: 300 }}>
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