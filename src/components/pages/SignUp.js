import React, {Component} from 'react';
// import auth from '../../auth'
import './SignUp.css';
import api from "../../api";
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';

const ENTER = 13;

const style = {
  margin: '5% 30%',
  textAlign: 'center',
  display: 'inline-block',

};


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null})
    }
    if (e.keyCode===ENTER) {
      this._handleSignup()
    }
  }

  _handleSignup = (e) => {
    e.preventDefault();
    api.requestSignup(this.refs.email.value, this.refs.password.value)
    .then(res => {
      if(this.refs.email.value && this.refs.password.value){
        this.props.router.push('/login')
      }
    })
    .catch(
      this.setState({error:"Please put in a username or password"})
    )

  }

  render() {
    return (
      <div className="signup row">
        <Paper style={style} className="col-large-6 big" zDepth={2}>
          <div className="centered">
            <TextField className="small col-large-6" floatingLabelText="First Name" ref="firstName" maxLength="100" onKeyUp={this._handleTyping}/>
            <TextField className="small col-large-6" floatingLabelText="Last Name" ref="lastName" maxLength="100" onKeyUp={this._handleTyping}/>
            <TextField className="small col-large-6" floatingLabelText="Email" ref="email" maxLength="254" onKeyUp={this._handleTyping}/>
            <TextField className="small col-large-6" floatingLabelText="Password" ref="password" type="password" onKeyUp={this._handleTyping}/>
          </div>
            <RaisedButton label="SignUp" secondary={true} onClick={this._handleSignup}/>

        </Paper>

      </div>


    );
  }

}
