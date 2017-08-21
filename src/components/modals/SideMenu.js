import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Me from './Me';
import api from '../../api';
import CoworkerTab from './CoworkerTab';

export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  componentDidMount = () => {
    this._fetchData();
  }

  _fetchData = () => {
    api.getAll(localStorage.token)
    .then(data => this.setState({coworkers:data}))
    .then(() => console.log('SideMenu 22 ', this.state));
  }

  render() {
    // console.log(this.state);
    //let { coworkers } = this.state.coworkers.body;

    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.props.menuState}
          onRequestChange={this.props.closeState}>
          <MenuItem onClick={this.props.closeState}>Togethering</MenuItem>
          <MenuItem onClick={this.props.closeState}><Me/></MenuItem>
          {this.state.coworkers && this.state.coworkers.body ?
          <CoworkerTab sideState={this.state.coworkers.body}/> : null}
        </Drawer>
      </div>
    );
  }
}

// export default class DrawerUndockedExample extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {open: false};
//   }
//
//   componentDidMount = () => {
//     this._fetchData();
//   }
//
//   _fetchData = () => {
//     api.getAll(localStorage.token)
//     .then(data => this.setState({coworkers:data}));
//   }
//
//   render() {
//     let { coworkers } = this.state.coworkers;
//     return (
//       <div>
//         <Drawer
//           docked={false}
//           width={200}
//           open={this.props.menuState}
//           onRequestChange={this.props.closeState}>
//           <MenuItem>Item 1</MenuItem>
//           <MenuItem onClick={this.props.closeState}><Me/></MenuItem>
//
//           { coworkers ? coworkers.map(b =>
//             <MenuItem>
//              <CoworkerTab
//
//                ReRenderTab={this._fetchData}
//              />
//              </MenuItem>
//            ) : <p>No coworkers</p> }
//
//           <MenuItem onClick={this.props.closeState}>Item 2</MenuItem>
//         </Drawer>
//       </div>
//     );
//   }
// }
