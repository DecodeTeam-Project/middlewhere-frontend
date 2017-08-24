import React, {Component} from 'react';
import api from '../../api';
import TaskCard from '../elements/TaskCard';
import CreateTask from '../modals/CreateTask';
import AddButton from '../elements/AddButton';
import { Link } from 'react-router';
import auth from '../../auth'
import ReturnButton from './ReturnButton'
import './Project.css';
import Conversation from '../elements/Conversation'


export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      open: false,
      isAdmin: false
    };
  }


  componentDidMount() {
    this.fetchData()
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  _handleFormSubmitted = () => {
    this.setState({createTask : false})
  }


  fetchData = () => {
      api.getTasks(this.props.params.id, localStorage.token)
      .then(res => {
        this.setState({
          tasks: res.body
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
          userId: user.users_id,
          projectTitle: project.title,
          firstName: user.users_firstName
        })
      })

  }

  _createTaskForm = () =>{
    this.setState({
      createTask: true
    })
  }

  render() {
    let { tasks, projectTitle } = this.state;

    return (
      <div className="tasks">
         { tasks.length !== 0 ? tasks.map(b =>
           <div className="single-proj col-large-3 col-medium-6 col-small-12">
            <TaskCard
              projectId={this.props.params.id}
              isAdmin={this.state.isAdmin}
              userId={this.state.userId}
              key={b.id}
              id={b.id}
              title={b.title}
              description={b.description}
              deadline={b.deadline}
              priority={b.priority}
              ReRenderProject={this.fetchData}
            />
            </div>
          ) : <h2>Add tasks</h2> }

          <div className="single-proj col-large-3 col-medium-6 col-small-12">
            <Conversation projectId={this.props.params.id} username={this.state.firstName} />
          </div>

          {auth.isLoggedIn() ? <Link to={`/projects`}> <ReturnButton projectTitle={projectTitle}/> </Link> : null}
        {this.state.isAdmin?  <AddButton buttonClick={this._createTaskForm} /> : null}
        {this.state.createTask ? <CreateTask onCreate={this.fetchData}
          projectId={this.props.params.id}
          openState={this.handleOpen} closeState={this.handleClose}
          closeForm={this._handleFormSubmitted}/> : null}

      </div>
    );
  }

}
