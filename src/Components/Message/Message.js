import React, { Component } from 'react';
import './Message.css';


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:''
    };
  }
  render() {
    return (
      <div className="Message-box">
        <p className="Message-text">{this.state.message}</p>
        <a className="Confirmation">OK</a>
      </div>
    );
  }
}

export default Message;
