import React, { Component } from 'react';
import AppHeader from './components/appHeader';
import AppFooter from './components/appFooter';
import WordStacks from './components/wordStacks/wordStacks';


import 'semantic-ui-css/semantic.min.css';
class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div class="Site">
      <AppHeader />
      <main className={"Site-content"}>
        <WordStacks />
      </main>
      <AppFooter />
    </div>;
  }
}

export default App;
