import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
class PendingWords extends  Component{
  constructor(props){
    super(props);
    this.state = { words: props.words };
  }
  render(){
    return <List divided relaxed>
      { this.state.words.map(w=> {
        return <List.Item>

          <List.Content>
            <List.Header as='div'>
              {w.word}
                <Icon name='erase' as='a'/>
            </List.Header>
            <List.Description as='a'>{w.url}</List.Description>
          </List.Content>
        </List.Item>
      }) }
    </List>
  }
}
export default PendingWords;
