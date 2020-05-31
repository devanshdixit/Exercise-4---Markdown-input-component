import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.outputRef = React.createRef(); 
    this.state = {
          bold: false,
          italized: false,
        };
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onItalicsClick = this.onItalicsClick.bind(this);
    this.onUnderlineClick = this.onUnderlineClick.bind(this);
  }  

  onBoldClick(event)
  {
    event.target.setAttribute("class", !this.state.bold ? "Selected" : "");
    if (!this.state.bold)
    {
      this.outputRef.current.innerHTML += "<strong></strong>";
    }
    this.setState({bold: !this.state.bold});
    this.inputRef.current.focus();
  } 

  onItalicsClick(event)
  {
    event.target.setAttribute("class", !this.state.italized ? "Selected" : "");
    if(!this.state.italized)
    {
      this.outputRef.current.innerHTML += "<em></em>";
    }
    this.setState({italized: !this.state.italized});
    this.inputRef.current.focus();
  }

  onUnderlineClick(event)
  {
    event.target.setAttribute("class", !this.state.underlined ? "Selected" : "");
    if (!this.state.underlined)
    {
      this.outputRef.current.innerHTML += "<u></u>";
    }
    this.setState({underlined: !this.state.underlined});
    this.inputRef.current.focus();
  }

  onInputChange()
  {
    const input = this.inputRef.current.value;
    const output = this.outputRef.current.innerText;
    if (input.length > output.length)
    {
      const newText = input.slice(output.length);
      this.formatText(newText);
    }
    else
    {
      this.transferText();
    }
  }

  formatText(text)
  {
    switch(true)
    {
      case this.state.bold:
        const allBold = this.outputRef.current.getElementsByTagName("strong");
        const lastBold = allBold[allBold.length - 1];
        lastBold.innerText += text;
        break;
      case this.state.italized:
        const allItalized = this.outputRef.current.getElementsByTagName("em");
        const lastItalized = allItalized[allItalized.length - 1];
        lastItalized.innerText += text;
        break;
      case this.state.underlined:
        const allUnderlined = this.outputRef.current.getElementsByTagName("u");
        const lastUnderlined = allUnderlined[allUnderlined.length - 1];
        lastUnderlined.innerText += text;
        break;
      default:    
        this.outputRef.current.innerHTML += text;
        break;
      }
  }
   
  transferText()
  {
    const input = this.inputRef.current.value;
    const output = this.outputRef.current.innerHTML;
    let inputCounter = input.length - 1, outputCounter = output.length - 1, isTag = false;
    while (outputCounter > -1)
    {
      if (output[outputCounter] === ">")
      {
        isTag = true;
        outputCounter -= 1;
        continue;
      }
      if(isTag)
      {
        isTag = output[outputCounter] !== "<";
        outputCounter -= 1;
        continue;
      }
      if(inputCounter <= -1)
      {
        this.outputRef.current.innerHTML = this.outputRef.current.innerHTML.slice(outputCounter + 1);
        break;
      }
      else
      {
        let temp = this.outputRef.current.innerHTML;
        temp = temp.slice(0, outputCounter) + input[inputCounter] + temp.slice(outputCounter + 1);this.outputRef.current.innerHTML = temp;
        inputCounter -= 1;
        outputCounter -= 1;
      }
    }
  }
  
  render()
  {
    return (
    <div className="App">
      <header className="App-header ">
        <h1>Exercise 4 - Markdown input component</h1>
        <h3>Output:</h3>
        <div className="output  Text">
          <div ref={this.outputRef} ></div>
        </div>
        <br/>
        <textarea rows="5" className="Text" ref={this.inputRef}  onChange={this.onInputChange.bind(this)} />
        <span className="Controls">
          <button onClick={this.onBoldClick}><strong>B</strong></button>
          <button onClick={this.onItalicsClick}><em>I</em></button>
          <button onClick={this.onUnderlineClick}><u>U</u></button> 
        </span>
      </header>
    </div>
    );
  }
}

export default App;
