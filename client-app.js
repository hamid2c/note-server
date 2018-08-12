import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const ESC_KEYCODE = 27;
const ALT_KEYCODE = 18;
const BASE_URL = 'http://127.0.0.1:3300/api/v1/';
const TAGS_BOX_NAME = "tags-box";
const MARKDOWN_BOX_NAME = "markdown-box";
const MARKDOWN_BOX_REF = "markdown-ref";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  //headers: {"accept": "application/json"}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleServerResponse = this.handleServerResponse.bind(this); 
    this.state = {serverResponse: "init"}
  }
  handleServerResponse(response) {
    this.setState({serverResponse: response})
    console.log("handle change " + response);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Server Response: {this.state.serverResponse}</p>
        </header>
        <InputForm notifyAboutResponse={this.handleServerResponse} />
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
    this.state = {tagsValue: "", markdownValue: ""};
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
      this.setState({markdownValue:"", tagsValue:""});
      this.refs[MARKDOWN_BOX_REF].focus();
    }
    funcs[ALT_KEYCODE] = function(inputBox) {
      console.log("ALT! "+ inputBox.name + " " + inputBox.value);
      this.props.notifyAboutResponse("hi " + new Date());
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
        
        Markdown: <br />
        <textarea ref={MARKDOWN_BOX_REF} name={MARKDOWN_BOX_NAME}  value={this.state.markdownValue} 
        onKeyDown={this.handleKeyDown} onChange={this.handleMarkdownChange} 
        autoFocus rows="33" cols="40" />
        <br />
        Tags: <input type='text' name={TAGS_BOX_NAME} value={this.state.tagsValue} 
                onKeyDown={this.handleKeyDown} onChange={this.handleTagsChange}  />       
      </form>
    );
  }
}

export default App;
