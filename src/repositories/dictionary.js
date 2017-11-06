import $ from 'jquery';
const processLine= function processLine(line){
  var elements = line.split('\t');
  return {
    word: elements[0],
    weight: elements[2],
    url: `https://dictionary.cambridge.org/es/diccionario/ingles-espanol/${elements[0]}`,
    title: elements[0]
  }
}
const loadHtmlOnDom= (html)=>{
  $('#search-word-dom').load()
  const newElement = document.createElement('html');
  newElement.innerHtml = html;
  const dom = document.getElementById('search-word-dom');
  dom.appendChild(newElement);
  return new Promise((resolve, reject)=>{
    setTimeout(()=> resolve(dom), 200)
  })
}
const wordTranslationFromHtml = (dom)=>{
  const acceptions = Array.from(dom.querySelectorAll('.pos-block')).map((block)=>{
    return {
      translations:Array.from(block.querySelectorAll('.sense-block')).map((element)=>{
        return {
          translation: element.querySelector('.def-body .trans').innerText,
          definition: element.querySelector('.def').innerText,
          samplePhrases:Array.from(element.querySelectorAll('.eg')).map((sentence)=> sentence.innerText)
        };
      }),
      pos:block.querySelector('.pos').innerText,
      ukPronunciationUrl:block.querySelector('.uk span:last-of-type').attributes["data-src-mp3"].value,
      usPronunciationUrl:block.querySelector('.us span:last-of-type').attributes["data-src-mp3"].value
    }
  });
  return {
    word: dom.querySelector('.di-title').innerText,
    acceptions: acceptions
  };
}
const Dictionary = {
  getWordTranslation:(wordUrl)=>{
    return new Promise((resolve, reject)=>{
      $('#search-word-dom').load(wordUrl, ()=>{
        const dom = document.getElementById('search-word-dom');
        const word = wordTranslationFromHtml(dom);
        resolve(word);
      })
      // fetch(wordUrl)
      //   .then((response)=> response.text())
      //   .then(loadHtmlOnDom)
      //   .then(function(dom){
      //     const word = wordTranslationFromHtml(dom);
      //     resolve(word);
      //   })
    })
  },
  getWordsStartingWith: (word)=>{
    return new Promise((resolve, reject)=>{
      if (word.length < 1) reject("Need at least one character");
      else {
        fetch(`http://www.wordreference.com/2012/autocomplete/autocomplete.aspx?dict=enes&query=${word}`)
        .then((response)=> response.text())
        .then(function(data){
          var searchResults = data
                                .split('\n')
                                .map(processLine)
                                .sort((a,b)=> b.weight - a.weight)
                                .slice(0,20);
          resolve(searchResults);
        });
      }
    });
  }
}

export default Dictionary;
