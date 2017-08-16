import React, {Component} from 'react';
import './CreateProject.css';
import api from '../../api'
import {browserHistory as history} from 'react-router';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:''
    };
  }

  handleInput = (e) => {
    e.preventDefault()
    if (e.target.value.length <= 80){
      this.setState({
        inputValue:e.target.value
      })
    }
  }

  _handleClick = (e) => {
    e.preventDefault()
    this._fetchData()
    }

  _fetchData = () =>{
    api.createProjects(this.refs.title.value, this.refs.description.value, this.refs.dedlilne.valuelocalStorage.token)
    .then (res => {
      console.log(res.body)
      history.push(`/`)

    })

  }

  render(){
    return (
      <div className="createNewProject">
        <form>
          
          Title: <input type="text" ref="title" maxLength="20"/>
          <hr/>
          Description: <input value={this.state.inputValue} type="text" ref="description" maxLength="200" onInput={e => this.handleInput(e)}/>
          {this.state.inputValue.length}/80
          <hr/>
          Deadline: <input type="text" ref="deadline" maxLength="20"/>
          <hr/>
          <button type="submit" onClick={(e) => this._handleClick(e)}>Create</button>
        </form>
      </div>
    );
  }

}
