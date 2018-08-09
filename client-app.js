import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const ESC_KEYCODE = 27;
const ALT_KEYCODE = 18;
const BASE_URL = 'http://127.0.0.1:3300/api/v1/';
const TAGS_BOX_NAME = "tags-box";
const MARKDOWN_BOX_NAME = "markdown-box";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  //headers: {"accept": "application/json"}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); 
    this.state = {serverResponse: "init"}
  }
  handleChange(s) {
    this.setState({serverResponse: s})
    console.log("handle change " + s);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Server Response: {this.state.name}</p>
        </header>
        <InputForm changeFunc={this.handleChange} />
      </div>
    );
  }
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.state = {targsValue: "", markdownValue: ""};
  }
  handleKeyDown = function(e) {
    
    // if (e.keyCode === 27) {
    //   console.log('You pressed the escape key!');
    //   this.props.changeFunc(" something ");
    //   axiosInstance.post('/note', {
    //     markdown: 'Fred',
    //     tags: ['Flintstone', "science"]
    //   })
    //   .then(function (response) {
    //     changeFunc(response);
    //   })
    //   .catch(function (error) {
    //     changeFunc(error);
    //   });
    // }
    const funcs = {};
    funcs[ESC_KEYCODE] = function(inputBox) {
      console.log("ESC! " + inputBox.name + " " + inputBox.value);
      // trigger a state change to reset the input values.
    }
    funcs[ALT_KEYCODE] = function(inputBox) {
      console.log("ALT! "+ inputBox.name + " " + inputBox.value);
    }
    const action = funcs[e.keyCode];
    if (action !== undefined) {
      console.log("target value is " + e.target.value);
      if (e.target.name === TAGS_BOX_NAME) {
        
      } else if (e.target.name === MARKDOWN_BOX_NAME) {
        
      }
      action.apply(this, [e.target]);
    }
  }

  handleTagsChange = function(e) {
    this.setState({tagsValue: e.target.value});
  }

  handleMarkdownChange = function(e) {
    this.setState({markdownValue: e.target.value});
  }

  render() {
    return (
      <form>
        tags: <input type='text' name={TAGS_BOX_NAME} value={this.state.tagsValue} 
                onKeyDown={this.handleKeyDown} onChange={this.hanndleTagsChange} />
        <br />
        Markdown:
        <input type='text' name={MARKDOWN_BOX_NAME}  value={this.state.markdownValue} 
        onKeyDown={this.handleKeyDown} onChange={this.handleMarkdownChange} />
      </form>
    );
  }
}

export default App;
