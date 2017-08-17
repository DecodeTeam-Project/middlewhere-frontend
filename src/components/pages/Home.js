import React, {Component} from 'react';
import api from '../../api';
import ProjectCard from '../elements/ProjectCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import CreateProject from '../modals/CreateProject';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    api.getProjectsList()
    .then(data => {
      this.setState({
        projects:data.body
      })
    })
  }

  _createProjectForm = () =>{
    this.setState({
      createProject: true
    })
  }

  render() {
    let { projects } = this.state
    console.log(projects)
    return (
      <div className="home">
        { projects ? projects.map(p =>
          <div>
            <ProjectCard
              key={p.id}
              id={p.id}
              title={p.title}
              progress={p.progressPct}
              description={p.description}
            />
          </div>
        ) : <h1>No projects yet</h1>}
        {auth.isLoggedIn() ?  <AddButton addButtonClick={this._createProjectForm}  /> : null}
        {this.state.createProject ? <CreateProject/> : null}
      </div>
    );
  }

}
