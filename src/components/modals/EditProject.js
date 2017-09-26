//EDIT PROJECT CARD FORM
import React, {Component} from 'react';
import './CreateProject.css';
import api from '../../api';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';


export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:''
    };
  }

  _handleClose = () => {
      this.props.closeForm()
  }

  _handleChange = (e, date) => {
    this.setState({date: date})
  }

  _handleInput = (e) => {
    e.preventDefault()
    this.setState({
      inputValue: e.target.value
    })
  }
  
  _handleClick = (e) => {
    e.preventDefault()
    this._fetchData()
    }

  _fetchData = () =>{
    if(!this.refs.title.getValue()){
      this.setState({titleError: "Title is required"})
    }
   
    else(
      api.editProjects(
        this.props.id,
        this.refs.title.getValue(),
        this.refs.description.getValue(),
        this.state.date ? this.state.date.toISOString().substring(0, 10) : ''
      )
      .then(res => {
        //close EditCard form and get new list of projects
        this.props.closeForm();
      })
      .catch(error=> console.log(error)) 
    )
  }

  _clearErrorState = () =>{
     if(this.refs.title.getValue()){
        this.setState({titleError: ""})
    }
  }

  render(){
    const actions = [
      < FlatButton label="Cancel" primary={true} onClick={this._handleClose} />,
      < FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={(e) => this._handleClick(e)} />
    ];
    return (
      <div>
          <Dialog
            title="Edit Project"
            actions={actions}
            paperClassName="dialogPaper"
            autoScrollBodyContent={true}
            modal={false}
            open={this.props.openForm}  
            onRequestClose={this._handleClose} >
            <TextField floatingLabelText="Title: " defaultValue={this.props.title} type="text" ref="title" maxLength='100' errorText={this.state.titleError} onChange={this._clearErrorState}/>
            <DatePicker hintText="Deadline" mode="landscape" ref="deadline" onChange={(e, date) => this._handleChange(e, date)}/>
            <TextField floatingLabelText="Description: " multiLine={true} defaultValue={this.props.description} type="text" ref="description" maxLength="140" onInput={e => this._handleInput(e)} />
            {140 - this.state.inputValue.length}
          </Dialog>
      </div>

    );
  }

}