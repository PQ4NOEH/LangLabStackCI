import React, { Component } from 'react';
import { List, Button, Icon, Item } from 'semantic-ui-react';
const samplePhrase= (phrase)=> <span style={{'font-style': 'oblique', display:'block'}}>{phrase}</span>
const translation = (t)=>{
  return <div>
    <b>{t.translation}</b> {' || '} <span>{t.definition}</span>
    <br/><span>ej:</span><br/>
    { t.samplePhrases.map(samplePhrase) }
  </div>
}

const playSound = (e, selector)=>  e.target.parentElement.parentElement.querySelector(selector).play()
const wordAcception = (acception)=> <Item.Content>
    <Item.Header>
      {acception.pos}
      <audio style={{display: 'none'}}><source src={acception.ukPronunciationUrl} type="audio/mp3" /></audio>
      <audio style={{display: 'none'}}><source src={acception.usPronunciationUrl} type="audio/mp3" /></audio>
      {'  '}
      <i class="gb flag" onClick={(e)=>playSound(e, 'audio:first-of-type')} style={{cursor:'pointer'}}></i>
      <i class="us flag" onClick={(e)=>playSound(e, 'audio:last-of-type')} style={{cursor:'pointer'}}></i>
      <Button icon='mail forward' inverted color='blue' circular size='miny' floated='right'/>
    </Item.Header>
    <Item.Description>
    {acception.translations.map(translation)}
    </Item.Description>
  </Item.Content>

class Cleaner extends  Component{
  constructor(props){
    super(props);
    this.state = { words: props.words };
  }
  render(){

    const wordsList = this.state.words.map(w=> <List.Item>
        <List.Content>
          <List.Header style={{'font-size':'2em', 'text-align':'center'}}>{w.word}</List.Header>
          <List.Description>
            <Item.Group>
              {w.acceptions.map(wordAcception)}
            </Item.Group>
          </List.Description>
        </List.Content>
      </List.Item>
    )
    return <List divided relaxed>
      { wordsList }
    </List>
  }
}
export default Cleaner;
