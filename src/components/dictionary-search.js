import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import Dictionary from '../repositories/dictionary';

var searchWords= function searchWords(component){
  if (component.state.value.length < 1) return component.resetComponent()
  else
    Dictionary
      .getWordsStartingWith(component.state.value)
      .then((data)=>{
        component.setState({
          isLoading: false,
          results: data
        });
      });
}
class DictionarySearch extends  Component{
  componentWillMount(){
    this.resetComponent();
  }
  resetComponent=()=> this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => {
    Dictionary
      .getWordTranslation(result.url)
      .then((word)=>{
        this.props.onSearchResultSelected(word);
        this.resetComponent();
      });
  }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, results: [], value }, ()=> searchWords(this));
  }
  render(){
    const { isLoading, value, results } = this.state
    return <div>
    <div id='search-word-dom' style={{display:'none'}}></div>
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect.bind(this)}
        onSearchChange={this.handleSearchChange.bind(this)}
        results={results}
        value={value}
        {...this.props}
      />
    </div>
  }
}

export default DictionarySearch;
