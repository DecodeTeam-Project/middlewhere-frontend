import React, {Component} from 'react';
import moment from 'moment';
import api from '../../api';
import ProjectCard from '../elements/ProjectCard';
import AddButton from '../elements/AddButton';
import AddForm from '../elements/AddForm'
import auth from '../../auth';
import CreateProject from '../modals/CreateProject';
import Paper from 'material-ui/Paper'
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
<<<<<<< HEAD
      me : null
=======
      open:false
>>>>>>> b4561d0df1a6e7b2e6f7cd3678ad1d9ff75f3d87
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    api.getMe(localStorage.token)
    .then(yoSoy => {
      this.setState({me : yoSoy.body.users_id})
    })
    .then(() => api.getProjectsList())
    .then(data => {
      this.setState({
        projects:data.body
      })
    })
  }

  _createProjectForm = () => {
    this.setState({
      createProject: true
    })
  }



  render() {
    let { projects } = this.state
    return (
      <div className="home">
        { projects ? projects.map(p =>
          <div className = "single-proj col-large-3 col-medium-6 col-small-12">
            <ProjectCard
              isAdmin={p.adminUserId==this.state.me}
              key={p.id}
              id={p.id}
              progress={p.progressPct}
              title={p.title}
              deadline={p.deadline}
              description={p.description}
            />
          </div>
        ) : <h1>No projects yet</h1>}
<<<<<<< HEAD
        {auth.isLoggedIn() ?  <AddButton addButtonClick={this._createProjectForm}  /> : null}
        {this.state.createProject ? <CreateProject onCreate={this._fetchData}/> : null}
=======
        {auth.isLoggedIn() ?  <AddButton buttonClick={this.handleOpen}  /> : null}
        {this.state.open ? <CreateProject openState={this.handleOpen} closeState={this.handleClose}/> : null}
>>>>>>> b4561d0df1a6e7b2e6f7cd3678ad1d9ff75f3d87
      </div>
    );
  }

}

//addButtonClick={this._createProjectForm}
