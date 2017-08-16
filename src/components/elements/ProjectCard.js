import React, {Component} from 'react';
import EditButton from './EditButton';
import EditProject from '../modals/EditProject'
import auth from '../../auth';
import '../App.css';
import { Link } from 'react-router';
import {Card, CardHeader, CardText, LinearProgress} from 'material-ui';
import './ProjectCard.css';
// import EditButton from './EditButton';
// import EditProject from '../modals/EditProject'

export default class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _editProjectForm = () =>{
      this.setState({
        editProject: true

      })
    }

  render() {
    let { id, progress, title, description } = this.props
    return (

      <div>
        <Link to={`/projects/${id}`}>
          <Card className='project-card'>
            <CardHeader textStyle={{ paddingRight: 0}} title={title} />
            <CardText>{description}</CardText>
            <LinearProgress mode="determinate" value={progress} />
          </Card>
        </Link>
        {auth.props.isAdmin ?  <EditButton editButtonClick={this._editProjectForm} /> : null}
        {this.state.editProject ? <EditProject /> : null}
      </div>
    );

  }

}
