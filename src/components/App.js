import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './modals/Menu';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import {cyan500,pink100} from 'material-ui/styles/colors';


// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color:pink100,
//     textColor: cyan500,
//     backgroundColor: cyan500,
//   },
//
// });


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isMenuOpen: false }
  }

  closeMenu = () => this.setState({ isMenuOpen: false })

  render() {
    let {isMenuOpen} = this.state
    return (
      <MuiThemeProvider>
        <div className="App row">
          <div className="header col-small-12">
            <div className="App-navbar">
              <i className="fa fa-bars fa-2x menu-icon"
                onClick={()=>this.setState({ isMenuOpen: !isMenuOpen })}
              />
              <Link to="/" className="App-navbar__title"></Link>
            </div>
          </div>
          <Menu show={isMenuOpen} closeMenu={this.closeMenu}/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
