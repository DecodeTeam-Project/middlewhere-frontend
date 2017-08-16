import React, {Component} from 'react';
import './CreateProject.css';
import api from '../../api'
import {browserHistory as history} from 'react-router';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:''
    };
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      inputValue:e.target.value
    })
  }

  _handleClick = (e) => {
    e.preventDefault()
    this._fetchData()
    }

//put required title
  _fetchData = () =>{
    api.createProjects(this.refs.title.getValue(), this.refs.deadline.getValue(), this.refs.description.getValue(), localStorage.token)
    .then (res => {
      var solving = JSON.parse(res.text)
      console.log(solving[0].id)
      history.push(`/projects/${solving[0].id}`)
    })

  }

  render(){
    return (
      <div className="createNewProject">
          <TextField floatingLabelText="Title: " type="text" ref="title" maxLength='100'/>
          <TextField floatingLabelText="Deadline: " type="text" ref="deadline" maxLength='100'/>
          <TextField floatingLabelText="Description: " type="text" ref="description" maxLength="500" onInput={e => this.handleInput(e)} value={this.state.inputValue}/>
          {140 - this.state.inputValue.length}
          <FlatButton label="Submit" secondary={true} onClick={(e) => this._handleClick(e)} />
      </div>
    );
  }

}
