import React, {Component} from 'react';
import api from '../../api';
import TaskCard from '../elements/TaskCard';
import CreateTask from '../modals/CreateTask';
import AddButton from '../elements/AddButton';
import Paper from 'material-ui/Paper';
import Conversation from '../elements/Conversation'
import './Project.css';

const style = {
  margin: '20% 35%',
  textAlign: 'center',
  display: 'inline-block',
  padding: '2rem',
  opacity: 0.8
};

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
    this._fetchData()
  }

  _handleOpen = () => {
    this.setState({open: true});
  };

  _handleClose = () => {
    this.setState({open: false});
  };


  _fetchData = () => {
      // Retrieve all the tasks for a single project
      api.getTasks(this.props.params.id)
      .then(res => {
        this.setState({
          tasks: res.body
        })
      })
      .catch(console.error)

      // Retrieve userId and adminUserId to check if user is adminUser, if true -> Add Button
      Promise.all([
        api.getProjects(this.props.params.id),
        api.getMe()
      ])
      .then(data => {
        var project = data[0].body[0];
        var user = data[1].body;
        this.setState({
          isAdmin: user.users_id === project.adminUserId,
          userId: user.users_id,
          firstName: user.users_firstName
        })
      })

  }


  render() {
    let { tasks } = this.state;

    return (
      <div className="tasks">

         { tasks.length !== 0 ? tasks.map(b =>
           <div className="single-proj col-large-3 col-medium-6 col-small-12" key={b.id}>
            <TaskCard
              projectId={this.props.params.id}
              isAdmin={this.state.isAdmin}
              userId={this.state.userId}
              id={b.id}
              title={b.title}
              description={b.description}
              deadline={b.deadline}
              priority={b.priority}
              completed={b.completed}
              ReRenderProject={this._fetchData}
            />
            </div>
          ) : <Paper style={style} className="col-large-6" zDepth={2}><strong>NO TASKS YET</strong></Paper> }

        <Conversation projectId={this.props.params.id} username={this.state.firstName} />

        {this.state.isAdmin? <AddButton buttonClick={this._handleOpen} /> : null}
        {this.state.open ? <CreateTask projectId={this.props.params.id}
          onCreate={() => {this._handleClose(); this._fetchData()}}
          openState={this.state.open} closeState={this._handleClose}/> : null}

      </div>
    );
  }

}
