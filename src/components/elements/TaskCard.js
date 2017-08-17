import React, {Component} from 'react';
import EditButton from './EditButton';
import EditTask from '../modals/EditTask'
import auth from '../../auth';
import './TaskCard.css';

export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          </div>
          <br/>

          {this.props.isAdmin ?  <EditButton editButtonClick={this._editTaskForm} /> : null}
          {this.state.editTask ? <EditTask /> : null}
        </div>
    );
  }

}
