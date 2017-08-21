import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
// import './Me.css';

// import EditProject from '../modals/EditProject'
// import {Card, CardHeader, CardText, CardActions, LinearProgress} from 'material-ui';
// import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// import './ProjectCard.css';
// import '../App.css';
// import FloatingActionButton from 'material-ui/FloatingActionButton';

// import EditButton from './EditButton';
// import EditProject from '../modals/EditProject'

export default class Me extends React.Component {

  render() {
    return (<div className="followers-page">
      Hello {this.props.firstName} !
        <figure className='user-info'>
          <img
            className='user-info__avatar'
            src={this.props.avatarUrl}
            alt="..."/>
          <figcaption> Hello </figcaption>
        </figure>
      </div>)
  }
}
