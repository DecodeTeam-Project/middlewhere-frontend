import React, {Component} from 'react';
import auth from '../../auth'
import api from '../../api'
import './Login.css';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


const ENTER = 13;

const style = {
  margin: '5% 30%',
  textAlign: 'center',
  display: 'inline-block',
};

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state={
      error:false
    };
  }


  _handleLogin = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let email = this.refs.email.getValue()
    let password = this.refs.password.getValue()


    if(!email){
      this.setState({
        //throw error message(<div>Please enter an valid email and password</div>)
        error:true,
        //throw errorText message(MUI)
        emailError:"Email is required"
      })
    }
    if(!password){
      this.setState({
        error:true,
        passwordError:"Password is required"
      })
    }

    if(email && password) {
      //Create a new session(token)
      api.requestLogin(email, password)
      //check if token already exist if not, process login 
      auth.login(email, password)
      //Update users SET status='OFFLINE' to 'ONLINE' and push it to the homepage
      .then(() => api.resetStatus())
      .then(() => {
        this.setState({error:false})
        //<BrowserRouter; browserhistroy> creates its own history instance, and listens for changes on that. 
        //So a different instance will change the url but not update the <BrowserRouter>. -> use <withRouter>
        this.props.router.push('/projects')})
      .catch((error) =>
        this.setState({error:true})
      )
    }
  }

  _clearErrorState = () => {
    var email = this.refs.email.getValue()
    var password = this.refs.password.getValue()

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
        this._handleLogin()
      }
  }

  render() {

    return (
      <div className="signup row">
        <Paper style={style} className="col-large-6 paper-frame" zDepth={2}>
            <TextField className="col-large-6" floatingLabelText="Email" errorText={this.state.emailError} onChange={this._clearErrorState} ref="email" maxLength="254" onKeyUp={this._handleTyping}/>
            <TextField className="col-large-6" floatingLabelText="Password" errorText={this.state.passwordError} onChange={this._clearErrorState}  ref="password" type="password" onKeyUp={this._handleTyping}/>
            <br/>
            <RaisedButton className="button-pad" label="Let's Go" secondary={true} onClick={this._handleLogin} />
            {this.state.error? <div>Please enter an valid email and password</div> : null}

        </Paper>

      </div>

    );
  }

}

