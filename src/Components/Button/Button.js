
import React, { Component } from 'react';
import './Button.css';


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:'',
      name:this.props.buttonName,
      active:false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.setName = this.setName.bind(this);
    this.toggleActice = this.toggleActice.bind(this);
  }

  handleClick() {
    this.setName();
    this.props.onSave();
    this.toggleActice()
  }

  setName() {
    const name = this.props.buttonName.toUpperCase().split(' ')[0];
    let setName = name + 'ING...';
      console.log('buttonName', setName);
    this.setState({name:setName});
  }

  toggleActice() {
    let active = this.state.active;
      this.setState({active:!active});
  }

  render() {
    let className = this.state.active ? 'flashing' : '';
    return (
        <a className='Playlist-save' onClick={this.handleClick}>
          <span className={className}>
            {this.state.name}
          </span>
        </a>
    );
  }
}

export default Button;
