import React, {Component} from 'react';
import './CreateTask.css';
import api from '../../api';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:'',

    };
  }

  _handleChange = (e, date) => {
    this.setState ({
      date:date
    })
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      inputValue:e.target.value
    })
  }

  _handlePriority = (event, index, value) => this.setState({value});

  _handleClick = (e) => {
    e.preventDefault()
    this._fetchData()
    }

  _fetchData = () => {
    if(!this.refs.title.getValue()){
      this.setState({titleError: "Title is required"})
    }
    else(
        api.createTasks(
          this.props.projectId,
          this.refs.title.getValue(),
          this.refs.description.getValue(),
          this.state.date ?
            this.state.date.toISOString().substring(0, 10) : '',
          this.state.value)
        .then(data => {
          this.props.onCreate();
        })
        .catch(error=> console.log(error))
    )
  }

  _clearErrorState = () => {
    if(this.refs.title.getValue()){
      this.setState({titleError: ""})
    }
  }
 

  render(){
    const actions = [
    <FlatButton
      label="Cancel Task"
      primary={true}
      onClick={this.props.closeState}
    />,
    <FlatButton
      label="Submit Task"
      primary={true}
      keyboardFocused={true}
      onClick={(e) => this._handleClick(e)}
    />,
  ];

    return (
      <div className="createNewProject">
        <Dialog
         title="Create A Task"
         paperClassName="dialogPaper"
         actions={actions}
         modal={false}
         open={this.props.openState}
         onRequestClose={this.props.closeState}
       >
          <TextField floatingLabelText="Title: " type="text" ref="title" maxLength='50' errorText={this.state.titleError} onChange={this._clearErrorState}/>

          <DatePicker hintText="Deadline" mode="landscape" ref="deadline" autoOk={true} onChange={(e,date) => this._handleChange(e, date)}/>

          <TextField floatingLabelText="Description: " type="text" ref="description" multiLine={true} maxLength="140" onInput={e => this.handleInput(e)} value={this.state.inputValue}/>
          {140 - this.state.inputValue.length}
          <br/>
          <SelectField
              floatingLabelText="Priority"
              onChange={this._handlePriority}
              value={this.state.value}
              autoWidth={true}
            >

              <MenuItem value={"low"} primaryText="Low" />
              <MenuItem value={"normal"} primaryText="Normal" />
              <MenuItem value={"high"} primaryText="High" />
            </SelectField>
          </Dialog>
      </div>
    );
  }
}
