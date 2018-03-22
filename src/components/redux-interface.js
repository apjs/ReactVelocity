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
import Settings from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';
import {deepPurple200, deepPurple800, grey800, grey900, white} from 'material-ui/styles/colors';

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

const iconStyles = {
  marginRight: 24,
};

const cardStyle = {
  backgroundColor: grey900
}

class ReduxInterface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      dialogOpen: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //Toggle = Drawer
  handleToggle(){ this.setState({drawerOpen: !this.state.drawerOpen})};
  handleOpen(){this.setState({dialogOpen: true});};
  handleClose(){this.setState({dialogOpen: false});};

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <AppBar
          title={<img className="logo" src="https://agcb.neocities.org/reactVelocity.svg" alt="react velocity logo"/>}
          style={{
            paddingTop: 10,
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
                      src="https://agcb.neocities.org/reduxLogo.png"
                      backgroundColor={white} />
                  Currently in Redux
                </Chip>
              </Link>
              <Link to="/">
                <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar
                    src="https://agcb.neocities.org/reactLogo.png"
                    backgroundColor={white}/>
                  Change to React
                </Chip>
              </Link>
              <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}
                  onClick={this.handleOpen}>
                  <Avatar
                      icon={<Settings />}
                      color={deepPurple200}
                      backgroundColor={white} />
                  Instructions
              </Chip>
              <Dialog
                title="Instructions for starting your REDUX PROJECT:"
                modal={false}
                actions={actions}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
              >
                <ul style={{color: white}}>
                  <li>As indicated on the top three nodes named ‘action’, ‘reducer’, and ‘container/component’, please do not remove these nodes. They are placeholders for your project’s folder structure.</li>
                  <p></p>
                  <li>To begin, open the menu drawer by clicking on the horizontal lines in the top-left corner of the page. Please be sure that the appropriate file type is selected before you add a file.</li>
                  <p></p>
                  <li>If you wish to add an action creator, make sure that ‘Action’ is selected, type the name of that action in the ‘Action: Name’ input field and click ‘Add File’.</li>
                  <p></p>
                  <li>**IMPORTANT NOTE: A user created 'action' must be a child of the pre-generated 'action' component.</li>
                  <p></p>
                  <li>To add a reducer, select ‘Reducer’ from the menu drop-down, type the reducer’s name in the input field, and add all the cases for that reducer in the ‘Reducer: Case’ input field. </li>
                  <p></p>
                  <li>**IMPORTANT NOTE: You may add multiple cases for a single reducer, but please be sure that the cases are comma-separated.</li>
                  <p></p>
                  <li>Add a container by selecting the container option in the drop-down and title the container in the input field. You may add stateful and stateless components by selecting the component drop-down option and specifying on the bottom of the menu whether the component is stateful or stateless.</li>
                  <p></p>
                  <li>**IMPORTANT NOTE: WHEN YOU ADD A FILE, DRAG THE FILE TO ITS APPROPRIATE FOLDER ON THE PAGE AND NEST IT INSIDE ITS APPROPRIATE FOLDER.</li>
                  <p></p>
                  <li>For example, if you created an action creator, drag and drop the newly created file under the default ‘action’ node on the page. Once you have determined your project structure, you can export your files by clicking on the download button in the top-right corner of the screen.</li>
                  <p></p>
                  <li>If you have any questions, please contact us at: apjs.react.velocity@gmail.com</li>
                </ul>
              </Dialog>
            </div>
          </CardActions>
        </Card>
        <Drawer
          docked={false}
          width={150}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
        >
          <Card>
            <CardActions>
              <SelectField
                floatingLabelText="File Type"
                floatingLabelFixed={true}
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: deepPurple200}}
                underlineFocusStyle={{borderColor: deepPurple200}}
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
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: deepPurple200}}
                underlineFocusStyle={{borderColor: deepPurple200}}
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
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: deepPurple200}}
                underlineFocusStyle={{borderColor: deepPurple200}}
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
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: deepPurple200}}
                underlineFocusStyle={{borderColor: deepPurple200}}
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
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: deepPurple200}}
                underlineFocusStyle={{borderColor: deepPurple200}}
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
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: deepPurple200}}
                underlineFocusStyle={{borderColor: deepPurple200}}
                errorText={this.props.componentNameError}
                value={this.props.componentName}
                onChange={this.props.componentNameHandleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
              <RadioButtonGroup name="shipSpeed" defaultSelected= {false} onChange={(e) => {this.props.radioButtonChecked(e)}}>
                <RadioButton
                  value = {false}
                  label= "Stateless"
                  iconStyle={{fill: deepPurple200}}
                  style={styles.radioButton}
                />
                <RadioButton
                  value= {true}
                  label="Stateful"
                  iconStyle={{fill: deepPurple200}}
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <RaisedButton
                label="Add File"
                labelColor={grey900}
                backgroundColor={white}
                style={{
                  margin: 14,
                }}
                onClick={this.props.onButtonPress}/>
            </CardActions>
          </Card>
        </Drawer>
      </div>
    );
  }
}
export default ReduxInterface;
