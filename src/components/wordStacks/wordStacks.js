import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import DictionarySearch from './dictionary-search';
import WordStacksStats from './stats';
import Cleaner from './cleaner';

class WordStacks extends Component{
  constructor(props){
    super(props);
    this.state = {pendingWordsElements: []};

    this.onSearchResultSelected = this.onSearchResultSelected.bind(this);
  }
  render(){
    return <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
        <Cleaner words={this.state.pendingWordsElements}/>
        <DictionarySearch onSearchResultSelected={ this.onSearchResultSelected }/>
        </Grid.Column>
        <Grid.Column width={10}>
        <WordStacksStats />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  }
  onSearchResultSelected(selectedWord){
    var array = this.state.pendingWordsElements;
    array.push(selectedWord);
    this.setState({pendingWordsElements: array})
  }
}

export default WordStacks;
