
import React, { Component } from 'react';
import './Button.css';


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:'',
      name:this.props.buttonName,
      isActive:false
    };
    this.setName = this.setName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isActive !== this.state.isActive)
      this.setState({isActive:nextProps.isActive});
      this.setName(nextProps.isActive);
  }

  setName(active) {
    console.log(active);
    const defaultName = this.props.buttonName;
    if (active) {
      let nameToUpperCase = defaultName.toUpperCase().split(' ')[0];
      let nameLastLetterIsE = nameToUpperCase.slice(-1) === 'E';
      let newName = nameLastLetterIsE ? nameToUpperCase.slice(0,-1) : nameToUpperCase;
      let namePlusIng = newName + 'ING...';
      this.setState({name:namePlusIng});
    } else {
      this.setState({name:defaultName});
    }
  }



  render() {
    return (
        <a className='Playlist-save' onClick={this.props.onSave}>
          <span>
            {this.state.name}
          </span>
        </a>
    );
  }
}

export default Button;
