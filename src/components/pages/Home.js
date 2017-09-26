//LIST OF PROJECTS PAGE OF THE USER
import React, {Component} from 'react';
import api from '../../api';
import ProjectCard from '../elements/ProjectCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import CreateProject from '../modals/CreateProject';
import Paper from 'material-ui/Paper';
import './Home.css';
import '../App.css'

const noProjStyle = {
  margin: '20% 35%',
  textAlign: 'center',
  display: 'inline-block',
  padding: '2rem',
  opacity: 0.8
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      me: null,
      isAdmin: false,
      open:false
    };
  }

  handleOpen = () => this.setState({open: true});
  handleClose = () => this.setState({open: false});

  componentDidMount() {
    this._fetchData();
  }

  //to check if users_id===project.adminUserId & get the list of all the projects of the user
  _fetchData = () => {
    Promise.all([
      api.getMe(),
      api.getProjectsList()
    ])
    .then(data => {
      this.setState({
        me: data[0].body.users_id,
        projects: data[1].body
      })
    })
  } 


  render() {
    let { projects, me } = this.state;
    
    return (
      <div className="home">
        { projects.length !== 0 ? projects.map(p =>
          <div className="single-proj col-large-4 col-medium-6 col-small-12" key={p.id}>
            <ProjectCard
              isAdmin={p.adminUserId === me}
              projectAdmin={p.adminUserId}
              id={p.id}
              progress={p.progressPct}
              title={p.title}
              deadline={p.deadline}
              description={p.description}
              editProject={this._fetchData}
            />
          </div>
        ) : <Paper style={noProjStyle} className="col-large-6 paper-frame" zDepth={2}><strong>NO PROJECTS YET</strong></Paper>}

        {auth.isLoggedIn() ? <AddButton buttonClick={this.handleOpen}/> : null}
            {/*In Material-UI, open prop for Dialog should be a boolean value -> pass 'this.state.open' Not the function 'handleOpen'*/}
        {this.state.open ? <CreateProject onCreate={() => {this._fetchData(); this.handleClose()}} openState={this.state.open} closeState={this.handleClose}/> : null}
      </div>
    );
  }

}
