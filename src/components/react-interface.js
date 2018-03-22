import React, {Component} from 'react';
import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Settings from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';
import {cyan200, cyan800, grey800, grey900, white} from 'material-ui/styles/colors';

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
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      dialogOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  //Toggle = Drawer
  handleToggle(){ this.setState({drawerOpen: !this.state.drawerOpen})};
  //Change = Select Field
  handleChange(event, index, value) {this.setState({value})};
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
<<<<<<< HEAD
          title={<img className="logo" src="../src/reactVelocity.svg" alt="react velocity logo"/>}
=======
          title={<img className="logo" src="https://agcb.neocities.org/reactVelocity.svg" alt="react velocity logo"/>}
>>>>>>> d6e2dc1fa60891640f4e21eed77d2108d6d42811
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
                    src="data:image/png;base64,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"
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
                  <li>The component of ‘App’ is automatically generated, which may be used as the top-level parent component for your project.</li>
                  <p></p>
                  <li>In order to add children components to ‘App’, you can click on the ‘Add Child’ button to the far right of the ‘App’ component. </li>
                  <p></p>
                  <li>In case you delete the ‘App’ component, you can add another parent in the menu bar.</li>
                  <p></p>
                  <li>To delete a component, click on the ‘X’ that appears to the right of the ‘Add Child’ button. Deleting a parent node will also delete all of its children. </li>
                  <p></p>
                  <li>You may convert a stateless (or presentational) component to a stateful (or smart/class-based) component by toggling between the ‘stateless’ and ‘stateful’ buttons on the component. </li>
                  <p></p>
                  <li>Once you are satisfied with the structure of your project, click on the download button located at the top-right corner of the screen to export your components.</li>
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
