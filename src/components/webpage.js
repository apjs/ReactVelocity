import React, {Component} from 'react';
//AppBar & Card
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
//Drawer
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
//Radio Button
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//Select Field
import SelectField from 'material-ui/SelectField';
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
        width: 200,
    },
  };

class Webpage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    // this.onButtonPress = this.onButtonPress.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  //Toggle = Drawer
  handleToggle(){this.setState({open: !this.state.open})};
  //Change = Select Field
  handleChange(event, index, value) {this.setState({value})};
  handleTextFieldChange(e){
    this.setState({
      textFieldValue: e.target.value,
    });
  }
  
  onKeyPress(e) {
    if(e.key == 'Enter') {
      console.log(this.state.textFieldValue)
    }
  }
  
  render() {
    return (
      <div>
        <AppBar
          iconElementLeft={<FlatButton label="Menu" onClick={this.handleToggle} />}
          iconElementRight={
            <div>
              <FlatButton label="Save" />
              <FlatButton label="Load" />
              <FlatButton label="Export" />
            </div>
            }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Card>
            <CardActions>
              <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                <RadioButton
                  value="not_light"
                  label="React"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="light"
                  label="Redux"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            </CardActions>
          </Card>
          <Card>
            <CardActions>
              <SelectField
                floatingLabelText="Parent"
                value={this.state.value}
                onChange={this.handleChange}
                autoWidth={true}
              >
                <MenuItem value={1} primaryText="App" />
                <MenuItem value={2} primaryText="Board" />
                <MenuItem value={3} primaryText="Row" />
                <MenuItem value={4} primaryText="Squares" />
                <MenuItem value={5} primaryText="Score" />
              </SelectField>
            </CardActions>
          </Card>
          <Card>
            <CardActions>  
              <TextField 
                floatingLabelText="Child" 
                value={this.state.textFieldValue} 
                onChange={this.handleTextFieldChange}
                onKeyPress={this.onKeyPress}/>
            </CardActions>
            <RaisedButton 
              label="Add Child" 
              style={style} 
              onClick={this.props.onButtonPress} />
          </Card> 
        </Drawer>
      </div>
    );
  }
}

export default Webpage;

