import React, {Component} from 'react';
import './Me.css';


export default class Me extends Component {

  render() {
    return (
      <div className="followers-page">
        <p>Hello <br/>{this.props.firstName}</p>
        <hr/>
      </div>)
  }
}
