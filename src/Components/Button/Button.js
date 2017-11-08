
import React, { Component } from 'react';
import './Button.css';


class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a className="Playlist-save" onClick={this.props.onSave}>{this.props.buttonName}</a>
    );
  }
}

export default Button;
