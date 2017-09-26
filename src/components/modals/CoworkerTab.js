import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import './Me.css';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {
deepOrange300,
} from 'material-ui/styles/colors';

export default class Coworkers extends Component {

  render() {
    let coworkers = this.props.coworkers
    .filter(coworker => coworker.id!==this.props.me);
    var colorForStatus;
    
    return (
        <div>
          {coworkers.map(coworker => {
            if (coworker.status==='ONLINE'){
              colorForStatus='green';
            } else {
              colorForStatus='grey';
            }
            return (
              <MenuItem className="row" key={coworker.id}>
                <p style={{color:colorForStatus}}>{coworker.firstName}</p>
                <Avatar
                  src={coworker.avatarUrl} color={deepOrange300}
                  icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
                />
             </MenuItem>
            )
          }

         )}
        </div>
    );
  }
}
