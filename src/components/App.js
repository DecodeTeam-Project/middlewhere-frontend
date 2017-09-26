import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import auth from '../auth';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory as history} from 'react-router';
import SideMenu from './modals/SideMenu'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500, cyan700,
  orange300,
  grey100, grey300, grey400, grey500,grey900,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import './App.css';


const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#00BFA5',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: orange300,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
     }
  }

  //browserHistory.push() ; to manually redirect the user in any of the code
  //Link to '/login' -> Login.js
  _login = () => {
    history.push(`login`)
  }

  //To get the Login/SignUp Flat buttons, use '.then(redirect the page)' ; Asynchronous complex
  //It makes sure that the page is redirected after the localStorage token is deleted.
  _logOut = () => {
    auth.logout().then(() => history.push(`/`))
  }

  _signUp = () => {
    history.push(`/signup`)
  }

  handleToggle=() => this.setState({open: !this.state.open});
  handleClose=() => this.setState({open: false});
  
  render() {

    let style = {
      position:'fixed',
      top:0
    }


    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App row">

          <AppBar title={auth.isLoggedIn() ? <Link to='/projects'>WorkFlow</Link> : <Link to='/'>WorkFlow</Link> } className="appBar"
            style={style}
            titleStyle={{
              color:'#000',
              fontFamily: 'Advent Pro, sans-serif',
              fontSize: '2em'
          }}
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={auth.isLoggedIn() ?
               <FlatButton label="Logout" onClick={this._logOut}/>: <div><FlatButton label="Login" onClick={this._login}/><FlatButton label="Signup" onClick={this._signUp}/></div> }
          />
          {this.state.open ? (auth.isLoggedIn() ? <SideMenu menuState={this.state.open} closeState={this.handleClose}/> : null) : null}
          {this.props.children}
          </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
