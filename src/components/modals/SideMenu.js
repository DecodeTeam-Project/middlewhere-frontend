import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Me from './Me';
import CoworkerTab from './CoworkerTab'
import api from '../../api';


export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      me: null
    };
  }

  componentDidMount = () => {
    this._fetchData();
  }

  _fetchData = () => {
    Promise.all([
      api.getMe(),
      api.getAll()
    ])
    .then(data => {
      this.setState({
        me: data[0].body,
        coworkers: data[1].body
      })
    })
  }
 
  render() {
    
    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.menuState}
          containerStyle={{
            textAlign: 'center'
          }}
          onRequestChange={this.props.closeState}>
          <MenuItem className="sideMenuItems" onClick={this.props.closeState}>
            {this.state.me ?
              <Me 
              firstName={this.state.me.users_firstName}
              lastName={this.state.me.users_lastName}
              avatarUrl={this.state.me.avatarUrl} /> : null}
          </MenuItem>
          { this.state.coworkers ? <CoworkerTab coworkers={this.state.coworkers} me={this.state.me.users_id}/> : null}
        </Drawer>
      </div>
    );
  }
}
