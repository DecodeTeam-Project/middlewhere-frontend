import React from 'react';
import io from 'socket.io-client';
import { API_HOST } from '../../config';
import api from '../../api';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import './TaskCard.css';
import './Conversation.css';
import {
  cyan500, cyan700,
  pinkA200, orange300,
  grey100, grey300, grey400, grey500,grey900,grey700,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const style = {
  marginRight: 20,
};


export default class Conversation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      open: false
     }
  }

  componentDidMount () {
    this.socket = io(API_HOST)
    //this.socket = io(`https://69862b10.ngrok.io`) // https://69862b10.ngrok.io   // http://localhost:3000

    this.socket.on('message', message => {

      if ( parseInt(message.projectId) ===  parseInt(this.props.projectId) ) {
        this.setState({ messages: [message, ...this.state.messages] })

      }
    })
    // api.conversationalize('stuff').catch(console.log('AN ERROR'));
    //console.log("Updates ___________________ ");
  }

  handleSubmit = event => {
    const body = {
      'text': event.target.value,
      'projectId': this.props.projectId,
      'from': this.props.username
    }
    if (event.keyCode === 13 && body) {
      const message = {
        body: body.text,
        from: 'Me'
      }
      // this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body)
      event.target.value = ''
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render () {
    const style = {
        margin: 0,
        right: 41.25,
        bottom: 130,
        position: 'fixed',
    };

    const messages = this.state.messages.map((message, index) => {
      const img = message.img ? <img src={message.img} width='200px' /> : null
      return <p key={index}><b>{message.from} : </b>{message.text} {img}</p>
    })
    return (
      <div>
        <FloatingActionButton style={style} backgroundColor={pinkA200} onClick={this.handleToggle}>
          <ChatBubble style={{fontSize:'12rem'}}/>
        </FloatingActionButton>

        <Drawer
          className="conversationLog"
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          openSecondary={true}
          overlayStyle={{backgroundColor:'rgba(255,255,255,0)'}}
          >
          <TextField
            hintText="Contribute..."
            multiLine={true}
            type='text'
            onKeyUp={this.handleSubmit}
          /><br />
          {messages}
        </Drawer>
      </div>

    )
  }
}

// <Card className="task-card">
//   <div>
//     <CardText color="#ef5350"> <input type='text' placeholder='Contribute...' onKeyUp={this.handleSubmit} />
//     {messages}</CardText>
//   </div>
// </Card>
    //
    // <input type='text' placeholder='Contribute...' onKeyUp={this.handleSubmit} />
    // {messages}