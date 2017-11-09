
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
    this.handleClick = this.handleClick.bind(this);
    this.setName = this.setName.bind(this);
  }


  handleClick() {
    this.props.onSave();

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.active !== this.state.isActive)
      this.setState({isActive:nextProps.active});
      this.setName(nextProps.active);

  }

  setName(active) {
    console.log(active);
    const name = this.props.buttonName;
    if (active) {
      let nameToUpperCase = name.toUpperCase().split(' ')[0];
      let nameLastLetterIsE = nameToUpperCase.slice(-1) === 'E';
      let newName = nameLastLetterIsE ? nameToUpperCase.slice(0,-1) : nameToUpperCase;
      let namePlusIng = newName + 'ING...';
      this.setState({name:namePlusIng});
    } else {
      this.setState({name:name});
    }
  }



  render() {
    // this.state.isActive ? 'flashing' :
    let className =  '';
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
