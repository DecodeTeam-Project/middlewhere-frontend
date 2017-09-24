import React from 'react';
import io from 'socket.io-client';
import { API_HOST } from '../../config';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import './TaskCard.css';
import './Conversation.css';
import {pinkA200} from 'material-ui/styles/colors';


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

      if ( parseInt(message.projectId,8) ===  parseInt(this.props.projectId,8) ) {
        this.setState({ messages: [message, ...this.state.messages] })

      }
    })
    
  }

  handleSubmit = event => {
    const body = {
      'text': event.target.value,
      'projectId': this.props.projectId,
      'from': this.props.username
    }
    if (event.keyCode === 13 && body) {
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
      const img = message.img ? <img src={message.img} alt='img' width='200px' /> : null
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
