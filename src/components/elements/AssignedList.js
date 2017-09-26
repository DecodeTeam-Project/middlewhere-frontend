import React, {Component} from 'react';
import {CardText} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import './TaskCard.css';
import '../App.css';

export default class AssignedList extends Component {

  render() {
    let { firstName, avatarUrl } = this.props

    return (
      <div className="col-small-3 task-assigned-text">
        <Avatar src={`${avatarUrl}`} />
        <CardText style={{fontSize:"0.6rem", padding:"0.5rem"}}>{firstName}</CardText>
      </div>
    );

  }

}

