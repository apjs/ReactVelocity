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
          title={<img className="logo" src="../src/reactVelocity.svg" alt="react velocity logo"/>}
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
                      src="../src/reduxLogo.png"
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
                    src="https://cdn-images-1.medium.com/max/256/1*XgMpgjwwDrHLOiS748kpBg.png"
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
              <a href='https://github.com/apjs/ReactVelocity'>
                <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar
                    src="data:image/png;base64,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"
                    backgroundColor={white}/>
                    Github
                </Chip>
              </a>
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
