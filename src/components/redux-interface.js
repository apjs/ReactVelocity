import React, {Component} from 'react';
import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

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
  }

  //Toggle = Drawer
  handleToggle(){ this.setState({open: !this.state.open})};

  render() {    
    return (
      <div>
        <AppBar
          iconElementLeft={
            <div>
              <FlatButton label="Menu" onClick={this.handleToggle} />
            </div>
          }
          iconElementRight={
            <div>
              <FlatButton onClick={this.props.exportZipFiles} label="Export" />
            </div>  
          }
        />
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
        <Drawer
          docked={false}
          width={150}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Card>
            <CardActions>
              <SelectField
                floatingLabelText="File Type"
                floatingLabelFixed={true}
                style= {{width: 135}}
                value={this.props.value}
                onChange={this.props.handleChangeSelectField}
              >
                <MenuItem value={"Action"} primaryText="Action" />
                <MenuItem value={"Reducer"} primaryText="Reducer" />
                <MenuItem value={"Container"} primaryText="Container" />
                <MenuItem value={"Component"} primaryText="Component" />
              </SelectField>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <TextField
                floatingLabelText="Action: Name"
                floatingLabelFixed={true}
                errorText={this.props.actionError}
                value={this.props.actionName}
                onChange={this.props.actionHandleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <TextField
                floatingLabelText="Reducer: Name"
                floatingLabelFixed={true}
                errorText={this.props.reducerNameError}
                value={this.props.reducerName}
                onChange={this.props.reducerNameHandleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <TextField
                floatingLabelText="Reducer: Case"
                floatingLabelFixed={true}
                errorText={this.props.reducerCaseError}
                value={this.props.reducerCase}
                onChange={this.props.reducerCaseHandleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <TextField
                floatingLabelText="Component: Name"
                floatingLabelFixed={true}
                errorText={this.props.componentNameError}
                value={this.props.componentName}
                onChange={this.props.componentNameHandleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <RaisedButton
                label="Add File"
                style={style}
                onClick={this.props.onButtonPress}/>
            </CardActions>  
          </Card>
        </Drawer>
      </div>
    );
  }
}
export default ReduxInterface;
