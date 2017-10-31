import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'
var processLine= function processLine(line){
  var elements = line.split('\t');
  return {
    word: elements[0],
    weight: elements[2],
    url: `http://www.wordreference.com/es/translation.asp?tranword=${elements[0]}`,
    title: elements[0]
  }
}
var searchWords= function searchWords(component){
  if (component.state.value.length < 1) return component.resetComponent()
  else {
    fetch(`http://www.wordreference.com/2012/autocomplete/autocomplete.aspx?dict=enes&query=${component.state.value}`)
    .then((response)=> response.text())
    .then(function(data){
      var searchResults = data
                            .split('\n')
                            .slice(0,20)
                            .map(processLine);
                            
      component.setState({
        isLoading: false,
        results: searchResults
      });
    });
  }
}
class DictionarySearch extends  Component{
  componentWillMount(){
    this.resetComponent();
  }
  resetComponent=()=> this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => {
    this.props.onSearchResultSelected(result);
    this.resetComponent();
  }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, results: [], value }, ()=> searchWords(this));
  }
  render(){
    const { isLoading, value, results } = this.state
    return <div>
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
