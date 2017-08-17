import React, {Component} from 'react';
import api from '../../api';
import TaskCard from '../elements/TaskCard';
import CreateTask from '../modals/CreateTask';
import AddButton from '../elements/AddButton';
import './Project.css';


export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isAdmin: false
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
      api.getTasks(this.props.params.id)
      .then(res => {
        let resultTasks = res.body
        this.setState({
          tasks: resultTasks
        })
      })
      .catch(console.error)

      Promise.all([
        api.getProjects(this.props.params.id),
        api.getMe(localStorage.token)
      ])
      .then(data => {
        var project = data[0].body[0];
        var user = data[1].body;
        this.setState({
          isAdmin: user.users_id === project.adminUserId,
          userId: user.users_id
        })
      })

  }

  _createTaskForm = () =>{
    this.setState({
      createTask: true
    })
  }

  render() {
    let { tasks } = this.state;
    return (
      <div className="tasks">
         { tasks ? tasks.map(b =>
          <TaskCard
            isAdmin={this.state.isAdmin}
            userId={this.state.userId}
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
            deadline={b.deadline}
            priority={b.priority}
          />
        ) : <h1>Add tasks</h1> }

        {this.state.isAdmin?  <AddButton addButtonClick={this._createTaskForm} /> : null}
        {this.state.createTask ? <CreateTask onCreate={this.fetchData} projectId={this.props.params.id}/> : null}

      </div>
    );
  }

}
