import React from 'react';
import {Card, Icon} from 'semantic-ui-react';
const data = [
  {
    stackName:"Choose the right translation",
    numberOfWords:50,
    numberOfWorkedWords:203,
    numberOfRefusedWords:3,
    numberOfPassedWords:200,
    elapsedTime:2000
  },
  {
    stackName:"Choose the right translation (Inverted)",
    numberOfWords:2,
    numberOfWorkedWords:344,
    numberOfRefusedWords:9,
    numberOfPassedWords:335,
    elapsedTime:4400000
  },
  {
    stackName:"Choose the word you heard",
    numberOfWords:23,
    numberOfWorkedWords:12,
    numberOfRefusedWords:34,
    numberOfPassedWords:344,
    elapsedTime:100
  },
  {
    stackName:"Find the definition",
    numberOfWords:23,
    numberOfWorkedWords:12,
    numberOfRefusedWords:34,
    numberOfPassedWords:344,
    elapsedTime:100
  },
  {
    stackName:"Fill the gap",
    numberOfWords:23,
    numberOfWorkedWords:12,
    numberOfRefusedWords:34,
    numberOfPassedWords:344,
    elapsedTime:100
  },
  {
    stackName:"Match the synonyms",
    numberOfWords:23,
    numberOfWorkedWords:12,
    numberOfRefusedWords:34,
    numberOfPassedWords:344,
    elapsedTime:100
  },
  {
    stackName:"Match the antonyms",
    stackDescription:"Match each word with the corresponding antonym",
    numberOfWords:23,
    numberOfWorkedWords:12,
    numberOfRefusedWords:34,
    numberOfPassedWords:344,
    elapsedTime:100
  }
]
const calculateTime= (totalSeconds)=>{
  if(totalSeconds<60) return `${totalSeconds} sg`;
  else if(totalSeconds<3600) return `${Math.round(totalSeconds/60)} m`;
  return `${Math.round(totalSeconds/3600)} h`
}
const GenerateCard =(cardInfo)=>{
  return <Card>
    <div style={{width:"90%", height:"20em", border:"1px solid black", margin:"2em auto", position:"relative"}}>
    <div style={{backgroundColor: "red", width:"100%", height:"18em", position:"absolute", bottom:"0"}}>
    </div>
    </div>
    <Card.Content>
      <Card.Header>
        { cardInfo.stackName }
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          There are { cardInfo.numberOfWords } words
        </span>
      </Card.Meta>
      <Card.Description>
        { cardInfo.stackDescription }
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a> <Icon name='thumbs outline up' /> { cardInfo.numberOfWorkedWords } </a>
      <a> <Icon name='smile' /> { cardInfo.numberOfPassedWords } </a>
      <a> <Icon name='frown' /> { cardInfo.numberOfRefusedWords } </a>
      <a> <Icon name='wait' /> { calculateTime(cardInfo.elapsedTime) } </a>
    </Card.Content>
  </Card>
}
const WordStacksStats =()=>{
  return <div>
  { data.map(GenerateCard) }
  </div>;
}

export default WordStacksStats;
