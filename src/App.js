import React, { Component } from 'react';
import DictionarySearch from './components/dictionary-search';
import Cleaner from './components/cleaner';
import 'semantic-ui-css/semantic.min.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {pendingWordsElements: []};
  }
  render() {
    return (
      <div className="App">
        <header>
          Dictionary stack
        </header>
        <Cleaner words={this.state.pendingWordsElements}/>
        <DictionarySearch onSearchResultSelected={this.onSearchResultSelected.bind(this)}/>
      </div>
    );
  }
  onSearchResultSelected(selectedWord){
    var array = this.state.pendingWordsElements;
    array.push(selectedWord);
    this.setState({pendingWordsElements: array})
  }
}

export default App;
