import React, {Component} from 'react';
import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions} from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Settings from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';
import {cyan200, cyan800, grey900, white} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const iconStyles = {
  marginRight: 24,
};

class ReactInterface extends Component {
  state = {
    drawerOpen: false,
    dialogOpen: false,
  };
  
  //Toggle = Drawer
  handleToggle = () => { this.setState({drawerOpen: !this.state.drawerOpen})};
  //Change = Select Field
  handleChange = (event, index, value) => {this.setState({value})};
  handleOpen = () => {this.setState({dialogOpen: true});};
  handleClose = () => {this.setState({dialogOpen: false});};

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const instructions = ['The component of ‘App’ is automatically generated, which may be used as the top-level parent component for your project.',
'In order to add children components to ‘App’, you can click on the ‘Add Child’ button to the far right of the ‘App’ component.',
'In case you delete the ‘App’ component, you can add another parent in the menu bar.',
'To delete a component, click on the ‘X’ that appears to the right of the ‘Add Child’ button. Deleting a parent node will also delete all of its children.',
'You may convert a stateless (or presentational) component to a stateful (or smart/class-based) component by toggling between the ‘stateless’ and ‘stateful’ buttons on the component.',
'Once you are satisfied with the structure of your project, click on the download button located at the top-right corner of the screen to export your components.',
'If you have any questions, please contact us at: apjs.react.velocity@gmail.com'
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
                <Menu style={iconStyles} color={cyan200} />
              </IconButton>
            </div>
          }

          iconElementRight={
            <IconButton onClick={this.props.exportZipFiles} tooltip="Download" >
              <FileDownload style={iconStyles} color={cyan200} />
            </IconButton>
            }
        />

        <Card style={{
            backgroundColor: cyan800,
          }}>
          <CardActions>
            <div style={styles.wrapper}>
              <Link to="/">
                <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar
                    src="https://agcb.neocities.org/reactLogo.png"
                    backgroundColor={white}/>
                  Currently in React
                </Chip>
              </Link>
              <Link to="/redux">
                <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar
                      src="https://agcb.neocities.org/reduxLogo.png"
                      backgroundColor={white} />
                  Change to Redux
                </Chip>
              </Link>
              <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}
                  onClick={this.handleOpen}>
                  <Avatar
                      icon={<Settings />}
                      color={cyan200}
                      backgroundColor={white} />
                  Instructions
              </Chip>
              <a href='https://github.com/apjs/ReactVelocity'>
                <Chip
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar
                    src="https://agcb.neocities.org/gitHubIcon.png"
                    backgroundColor={white}/>
                    Github
                </Chip>
              </a>
              <Dialog
                title="Instructions for starting your REACT PROJECT:"
                modal={false}
                actions={actions}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
              >
                <ul style={{color: white}}>
                 {instructions.map((instruction) => <li>{instruction}</li>
                 )}
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
            <CardActions >
              <TextField
                floatingLabelText="Parent"
                floatingLabelFixed={true}
                floatingLabelStyle={{color:white}}
                underlineStyle={{color:white}}
                floatingLabelFocusStyle={{color: cyan200}}
                underlineFocusStyle={{color: cyan200}}
                errorText={this.props.error}
                value={this.props.textFieldValue}
                onChange={this.props.handleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
            <RaisedButton
              label="Add Parent"
              labelColor={grey900}
              backgroundColor={white}
              style={{
                margin: 14,
              }}
              onClick={this.props.onButtonPress}/>
          </Card>
        </Drawer>
      </div>
    );
  }
}
export default ReactInterface;
