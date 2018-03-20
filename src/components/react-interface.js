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
import {cyan200, cyan800, grey900, white} from 'material-ui/styles/colors';

const style = {
  margin: 12,
};

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
          title={<img src="../src/reactVelocity.png" alt="react velocity logo"/>}
          style={{
            color: cyan200,
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
<<<<<<< HEAD
            <div style={styles.wrapper}>
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
              <Link to="/redux">
                <Chip 
                  style={styles.chip}
                  backgroundColor={grey900}
                  labelColor={white}>
                  <Avatar 
                      src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L5K1I1WsuQMZ8ecEuWg%2Favatar.png?generation=1518623866348435&alt=media" 
                      backgroundColor={white} />
                  Redux
                </Chip>
              </Link>
            </div>
          </CardActions>
        </Card>
=======
            <Link to="/">
              <IconButton tooltip="React" >

                <Avatar
                  style={{
                  marginLeft: '100',
                  }}
                  src="https://cdn-images-1.medium.com/max/256/1*XgMpgjwwDrHLOiS748kpBg.png"
                  backgroundColor={white}/>

              </IconButton>
                </Link>
                  <Link to="/redux">
              <IconButton tooltip="Redux" >

                  <Avatar
                    src="../src/reduxLogo.png"
                    backgroundColor={white} />

              </IconButton>
                </Link>
            </CardActions>
          </Card>
>>>>>>> b31013e4a0c22409ddf098db00bf12cc11e00845
        <Drawer
          docked={false}
          width={150}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <IconButton tooltip="Redux" >
            <Link to="/redux">
              <Avatar
                src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L5K1I1WsuQMZ8ecEuWg%2Favatar.png?generation=1518623866348435&alt=media"
                backgroundColor={white} />
            </Link>
          </IconButton>
          <Card>
            <CardActions>
              <TextField
                floatingLabelText="Child"
                floatingLabelFixed={true}
                errorText={this.props.error}
                value={this.props.textFieldValue}
                onChange={this.props.handleTextFieldChange}
                onKeyPress={this.props.onKeyPress}
                style= {{width: 135}}/>
            </CardActions>
            <RaisedButton
              label="Add Child"
              style={style}
              onClick={this.props.onButtonPress}/>
          </Card>
        </Drawer>
      </div>
    );
  }
}
export default ReactInterface;
