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

export default class CoworkerTab extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     open:false
  //   };
  // }
  //
  //   _editProjectForm = () =>{
  //       this.setState({
  //         editProject: true
  //       })
  //   }
  //
  //   _handleFormSubmitted = () => {
  //     this.setState({editProject:false});
  //     this.props.editProject();
  //   }

  render() {
    let coworkers = this.props.sideState;

    return (
      <div>
        <ul>
          {coworkers.map(c=>
            <li>{c.avatarUrl, c.email}
              <figure className='user-info'>
                <img
                  className='user-info__avatar'
                  src={c.avatarUrl}
                  alt={c.firstName}/>
                <figcaption> {c.email} </figcaption>
              </figure>
            </li>
          )}
        </ul>
      </div>
    );

  }

}
