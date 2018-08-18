"use strict";

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const ESC_KEYCODE = 27;
const ALT_KEYCODE = 18;
const BASE_URL = 'http://127.0.0.1:3300/api/v1/';
const TAGS_BOX_NAME = "tags-box";
const MARKDOWN_BOX_NAME = "markdown-box";
const MARKDOWN_BOX_REF = "markdown-ref";

/**
 * @returns a list of tags
 * @param the string containing all the tags (seperated by ,)
 */
function getTags(tags) {
  if (typeof tags !== "string") {
    console.log("The parameter should be a string");
    return [];
  }
  return tags.split(',').map(token => token.trim());
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  //headers: {"accept": "application/json"}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleServerResponse = this.handleServerResponse.bind(this);
    this.state = { serverResponse: "init" }
  }
  handleServerResponse(response) {
    this.setState({ serverResponse: response });
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
  prevTagsValue = "";
  prevMakdownValue = "";

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.state = { tagsValue: "", markdownValue: "" };
  }

  makeRequest = function () {
    let tags = getTags(this.state.tagsValue);
    let markdown = this.state.markdownValue.trim();
    
    if (this.state.tagsValue === this.prevTagsValue && 
            this.state.markdownValue === this.prevMakdownValue) {
      this.props.notifyAboutResponse("These values have been sent already.");
      return;
    }

    const thiz = this;
    axiosInstance.post('/note', {
      markdown: markdown,
      tags: tags
    }).then(function (response) {
      thiz.props.notifyAboutResponse(response.status);
      thiz.prevMakdownValue = thiz.state.markdownValue;
      thiz.prevTagsValue = thiz.state.tagsValue;
    }).catch(function (error) {
      let errMsg = (error.message === undefined)?"UNKNOWN SERVER ERROR":error.message;
      thiz.props.notifyAboutResponse(errMsg);
    });
    //this.props.notifyAboutResponse("hi " + new Date() + this.state.tagsValue);
  }
  handleKeyDown = function (e) {
    const funcs = {};
    funcs[ESC_KEYCODE] = function (inputBox) {
      this.setState({ markdownValue: "", tagsValue: "" });
      this.refs[MARKDOWN_BOX_REF].focus();
    }
    funcs[ALT_KEYCODE] = function (inputBox) {
      this.makeRequest();
    }
    const action = funcs[e.keyCode];
    if (action !== undefined) {
      action.apply(this, [e.target]);
    }
  }

  handleTagsChange = function (e) {
    this.setState({ tagsValue: e.target.value });
  }

  handleMarkdownChange = function (e) {
    this.setState({ markdownValue: e.target.value });
  }

  render() {
    return (
      <form>

        Markdown: <br />
        <textarea ref={MARKDOWN_BOX_REF} name={MARKDOWN_BOX_NAME} value={this.state.markdownValue}
          onKeyDown={this.handleKeyDown} onChange={this.handleMarkdownChange}
          autoFocus rows="33" cols="40" />
        <br />
        Tags: <input type='text' name={TAGS_BOX_NAME} value={this.state.tagsValue}
          onKeyDown={this.handleKeyDown} onChange={this.handleTagsChange} />
      </form>
    );
  }
}

export default App;
