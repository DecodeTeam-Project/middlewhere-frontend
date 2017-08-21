import React, {Component} from 'react';
import api from '../../api';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputValue:'',
      value:' '
    };
  }

  _handleInput = (e) => {
    e.preventDefault()
    this.setState({
      inputValue: e.target.value
    })
  }

  _handleChange = (e, date) => {
    this.setState({date: date})
  }


  _handleClick = (e) => {
    e.preventDefault()
    this._fetchData()
    }

  _handleClose = () => {
      this.props.closeForm()
  }
  _handlePriority = (event, index, value) => this.setState({value});

  _fetchData = () =>{
    console.log("I happened before api")
    if(this.refs.title.getValue()){
        api.editTasks(
        this.props.id,
        this.refs.title.getValue(),
        this.refs.description.getValue(),
        this.state.date ?
          this.state.date.toISOString().substring(0, 10) : '',
        this.state.value,
        localStorage.token)
      .then(res => {
        console.log("ihappened after")
        this.props.closeForm();
        //history.push(`/projects/${this.props.id}`)
      })
      .catch(console.log("I AM NOT WORKING, I'm a CATCH in EditTask.js"));
    }
    else {
      console.error("Must have a title, description, deadline")
      this.setState({error:"Must have a title and description"})
    }
  }

  render(){
    const actions = [
      < FlatButton label="Cancel" primary={true}
      onClick={this._handleClose} />,
      < FlatButton label="Submit" primary={true} keyboardFocused={true}
      onClick={(e) => this._handleClick(e)} />
    ];


    return (
      <div className="createNewProject">
        <div>
            <Dialog
              title="Edit Task"
              actions={actions}
              modal={false}
              open={true}
              onRequestClose={this._handleClose} >
              <TextField floatingLabelText="Title: " defaultValue={this.props.title} type="text" ref="title" maxLength='100'/>
              <DatePicker hintText="Deadline" mode="landscape" ref="deadline" onChange={(e, date) => this._handleChange(e, date)}/>
              <TextField floatingLabelText="Description: " defaultValue={this.props.description} type="text" ref="description" maxLength="140" onInput={e => this._handleInput(e)} />
              {140 - this.state.inputValue.length}
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
    </div>
    );
  }

}
