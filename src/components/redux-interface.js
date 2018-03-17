import React, {Component} from 'react';
import { Link } from "react-router-dom";
//AppBar & Card
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
//Drawer
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
//Text Field
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

const styles = {
    //Radio Button
    block: {
      maxWidth: 50,
    },
    radioButton: {
      marginBottom: 16,
    },
    //DropDown
    customWidth: {
        width: 100,
    },
  };

class ReduxInterface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Toggle = Drawer
  handleToggle(){ this.setState({open: !this.state.open})};
  //Change = Select Field
  handleChange(event, index, value) {this.setState({value})};

  render() {    
    return (
      <div>
        <AppBar
          iconElementLeft={<FlatButton label="Menu" onClick={this.handleToggle} />}
          iconElementRight={
            <div>
              <FlatButton onClick={this.props.exportZipFiles} label="Export" />
            </div>
            }
        />
        <Drawer
          docked={false}
          width={150}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Card>
            <CardActions>
              <Link to="/">
                <FlatButton label="React" primary={true} />
              </Link>
              <Link to="/redux">
                <FlatButton label="Redux" secondary={true} />
              </Link>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <TextField
                floatingLabelText="Action Creator"
                floatingLabelFixed={true}
                errorText={this.props.error}
                value={this.props.actionName}
                onChange={this.props.handleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
            <RaisedButton
              label="Add Action"
              style={style}
              onClick={this.props.onButtonPress}/>
          </Card>
        </Drawer>
      </div>
    );
  }
}
export default ReduxInterface;
