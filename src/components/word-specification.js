import React, { Component } from 'react';


class WordSpecification extends Component {
  constructor(props){
    super(props);
    this.state = { word: props.word };
  }
  render(){
    return <p>{this.state.word.word}</p>
  }
}

export default WordSpecification;
