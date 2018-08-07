import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const ESC_KEYCODE = 27;
const ALT_KEYCODE = 18;
const BASE_URL = 'http://127.0.0.1:3300/api/v1/';

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
    funcs[ESC_KEYCODE] = function() {
      console.log("ESC!");
    }
    funcs[ALT_KEYCODE] = function() {
      console.log("ALT!");
    }
    const action = funcs[e.keyCode];
    if (action === undefined) {
      console.log(e.keyCode + " has not been mapped to any action");
    } else {
      action();
    }
  }
  // tags: input value={this.state.tagsValue} onChange={}
  render() {
    return (
      <form>
        tags: <input type='text'  onKeyDown={this.handleKeyDown} />
        <br />
        Text:
        <input type='text'  onKeyDown={this.handleKeyDown} />
      </form>
    );
  }
}

export default App;
