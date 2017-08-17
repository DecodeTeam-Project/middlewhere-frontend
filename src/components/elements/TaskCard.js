import React, {Component} from 'react';
import EditButton from './EditButton';
import EditTask from '../modals/EditTask'
import auth from '../../auth';
import api from '../../api'
import './TaskCard.css';

export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleClick = () => {
    this.fetchData()
  }

  fetchData = () => {
    var taskId = this.props.id
    var assigneeId = this.props.userId

    api.assignTask(taskId, assigneeId)
    .then(res => {
      console.log(res, 'yayayay')
    })
  }

  _editTaskForm = () =>{
      this.setState({
        editTask: true
      })
    }

  render() {
    let { title, description, deadline } = this.props
    return (
        <div>
          <h2 className="task-card">{ title }</h2>
          <div className="info">
            <p>{ description }</p>
            <p className="deadline">deadline  { deadline }</p>
            <input type="text" ref="assignee"/>
            <button onClick={this._handleClick}>search</button>
          </div>
          <br/>

          {this.props.isAdmin ?  <EditButton editButtonClick={this._editTaskForm} /> : null}
          {this.state.editTask ? <EditTask /> : null}
        </div>
    );
  }

}
