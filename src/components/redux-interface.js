import React, {Component} from 'react';
import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import {deepPurple200, deepPurple800, grey900, white} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  block: {
    maxWidth: 50,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const style = {
  margin: 12,
};

const iconStyles = {
  marginRight: 24,
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
          title={<img src="../src/reactVelocity.png" alt="react velocity logo"/>}
          style={{
            backgroundColor: grey900,
          }}
          iconElementLeft={
            <div>
              <IconButton onClick={this.handleToggle} tooltip="Menu">
                <Menu style={iconStyles} color={deepPurple200} />
              </IconButton>
            </div>
          }
          iconElementRight={
            <IconButton onClick={this.props.exportZipFiles} tooltip="Download" >
              <FileDownload style={iconStyles} color={deepPurple200} />
            </IconButton>
            }
        />
         <Card style={{
            backgroundColor: deepPurple800,
          }}>
          <CardActions>
            <div style={styles.wrapper}>
              <Link to="/redux">
                <Chip 
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar 
                      src="../src/reduxLogo.png" 
                      backgroundColor={white} />
                  Redux
                </Chip>
              </Link>
              <Link to="/">
                <Chip 
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar 
                    src="https://cdn-images-1.medium.com/max/256/1*XgMpgjwwDrHLOiS748kpBg.png" 
                    backgroundColor={white}/>
                  React
                </Chip>
              </Link>
            </div>
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
                floatingLabelText="Container: Name"
                floatingLabelFixed={true}
                errorText={this.props.containerNameError}
                value={this.props.containerName}
                onChange={this.props.containerNameHandleTextFieldChange}
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
              <RadioButtonGroup name="shipSpeed" defaultSelected="stateless" onChange={(e) => {this.props.radioButtonChecked(e)}}>
                <RadioButton
                  value = {false}
                  label= "Stateless"
                  style={styles.radioButton}
                />
                <RadioButton
                  value= {true}
                  label="Stateful"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
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
