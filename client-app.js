import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
//curl -X POST "http://127.0.0.1:3300/api/v1/note" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"markdown\": \"good stuff\", \"tags\": [ \"string1\" ]}"

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3300/api/v1/',
  timeout: 1000,
  //headers: {"accept": "application/json"}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); 
  }
  handleChange(s) {
    //this.setState({temperature: ...});
    this.setState({"name": 'bla'})
    console.log("handle change " + s);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TodoForm changeFunc={this.handleChange} />
      </div>
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown = function(e) {
    
    if (e.keyCode === 27) {
      console.log('You pressed the escape key!');
      this.props.changeFunc(" something ");
      axiosInstance.post('/note', {
        markdown: 'Fred',
        tags: ['Flintstone', "science"]
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    console.log(e.keyCode);
  }

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
