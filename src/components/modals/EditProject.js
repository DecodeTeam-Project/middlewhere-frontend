import React, {Component} from 'react';
import './CreateProject.css';
import {browserHistory as history} from 'react-router';
import api from '../../api';

///THIS NEEDS  TO BE IMPLEMENTED
export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:this.props.description
    };
  }

  _handleClick = (e) => {
    this._fetchData()
    }

  handleInput = (e) => {
    e.preventDefault()
      this.setState({
        inputValue:e.target.value
      })
  }
  _fetchData = () =>{
    if(this.refs.title.value && this.refs.description.value){
      api.editProjects(this.refs.title.value, this.refs.description.value,localStorage.token)
      .then(res => {
          history.push(`/projects/`)
      })
    }
    else {
      console.error("Must have a title and description")
      this.setState({error:"Must have a title and description"})
    }
  }

  render(){
    return (
      <div className="createNewProject">
        <form>
          Title: <input defaultValue={this.props.title} maxLength="80" type="text" ref="title"/>
          <hr/>
          Description: <input defaultValue={this.state.inputValue} maxLength="80" type="text" ref="description" onInput={e => this.handleInput(e)}/>
          {this.state.inputValue.length}/80
          <hr/>
          <button type="submit" onClick={(e) => this._handleClick(e)}>Create</button>
        </form>
        <h3>{this.state.error}</h3>
      </div>
    );
  }

}
