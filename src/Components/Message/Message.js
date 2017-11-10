import React, { Component } from 'react';
import './Message.css';


class Message extends Component {

  render() {
    return (
      <div className="Message-box">
        <p className="Message-text">{this.props.message}</p>
        <a className="Confirmation">OK</a>
      </div>
    );
  }
}

export default Message;
