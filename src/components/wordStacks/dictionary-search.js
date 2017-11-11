import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import Dictionary from '../../repositories/dictionary';

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
  resetComponent=()=> this.setState({ isLoading: false, results: [], value: '', couldFindWord:true })
  handleResultSelect = (e, { result }) => {
    this.setState({value:result.title,isLoading:true});
    Dictionary
      .getWordTranslation(result.url)
      .then((word)=>{
        this.props.onSearchResultSelected(word);
        this.resetComponent();
      }).catch(()=> this.setState({couldFindWord:false,isLoading:false}));
  }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, results: [], value,couldFindWord:true }, ()=> searchWords(this));
  }
  render(){
    const { isLoading, value, results, couldFindWord  } = this.state
    const notFoundWordMessage = couldFindWord
      ? ""
      : <div class="ui icon red message">
          <i class="warning sign icon" ></i>
          <div class="content">
            <div class="header">
              The word <u>{value}</u> Could not be found.
            </div>
            <p></p>
          </div>
        </div>;

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
      {notFoundWordMessage}
    </div>
  }
}

export default DictionarySearch;
