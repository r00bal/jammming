import React, { Component } from 'react';
import './Message.css';


class Message extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

  }

  render() {
    return (
      <div className="Message-box">
        <h3 className="Message-text">{this.props.text}</h3>
        <a className="Confirmation" onClick={this.handleClick}>OK</a>
      </div>
    );
  }
}

export default Message;
