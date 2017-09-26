import React, {Component} from 'react';
import './SignUp.css';
import api from "../../api";
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';

const ENTER = 13;

const style = {
  margin: '5% 30%',
  textAlign: 'center',
};


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error:false,
      existingUser:false
    };
  }

  _handleSignup = () => {
    var firstName = this.refs.firstName.getValue()
    var lastName = this.refs.lastName.getValue()
    var email = this.refs.email.getValue()
    var password = this.refs.password.getValue()

     if(!firstName){
        this.setState({
        firstNameError:"First Name is required"
        })
      }
       if(!lastName){
        this.setState({
        lastNameError:"Last Name is required"
        })
      }
       if(!email){
        this.setState({
        emailError:"Email is required",
        emailHint:"Enter a valid Email"
        })
      }
       if(!password){
        this.setState({
        passwordError:"Password is required",
        passwordHint:"Password should be minimum 12 charactors"
        })
      }

      //User Email validation
      if(firstName && lastName && email && password){
        api.requestSignup(firstName, lastName, email, password)
        .then(()=> {
          this.props.router.push('/login')
        })
        .catch((existingUser)=> {
          this.setState({existingUser:true})
        })
      }
  }

  _clearErrorState = () => {
    var firstName = this.refs.firstName.getValue()
    var lastName = this.refs.lastName.getValue()
    var email = this.refs.email.getValue()
    var password = this.refs.password.getValue()

    if(firstName){
        this.setState({
        firstNameError:""
        })
      }
       if(lastName){
        this.setState({
        lastNameError:""
        })
      }
       if(email){
        this.setState({
        emailError:"",
        emailHint:""
        })
      }
       if(password){
        this.setState({
        passwordError:"",
        passwordHint:""
        })
      }
  }

  _handleTyping = (e) => {
      if (e.keyCode===ENTER) {
        this._handleSignup()
      }
  }

  render() {
    return (
      <div className="signup row">
        <Paper style={style} className="col-large-6 paper-frame" zDepth={2}>
            <TextField className="col-large-6" floatingLabelText="First Name" ref="firstName" maxLength="100" errorText={this.state.firstNameError} onChange={this._clearErrorState} onKeyUp={this._handleTyping}/>
            <TextField className="col-large-6" floatingLabelText="Last Name" ref="lastName" maxLength="100" errorText={this.state.lastNameError} onChange={this._clearErrorState} onKeyUp={this._handleTyping}/>
            <TextField className="col-large-6" floatingLabelText="Email" ref="email" maxLength="254" errorText={this.state.emailError} hintText={this.state.emailHint} onChange={this._clearErrorState} onKeyUp={this._handleTyping}/>
            <TextField className="col-large-6" floatingLabelText="Password" ref="password" type="password" errorText={this.state.passwordError} hintText={this.state.passwordHint} onChange={this._clearErrorState} onKeyUp={this._handleTyping}/>
            <br/>
          <RaisedButton className="button-pad" label="SignUp" secondary={true} onClick={this._handleSignup}/>
          {this.state.error ? <div>Please fill out the form completely</div> : null}
          {this.state.existingUser ? <div>User email already exists</div> : null}
        </Paper>

      </div>
    );
  }

}
