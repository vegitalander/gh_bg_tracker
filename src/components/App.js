import React, {Component} from 'react';
import axios from 'axios'

const api = axios.create({
  baseURL: `https://github.com/any2cards/gloomhaven/blob/master/data/battle-goals.js`
});

export class App extends Component {
  constructor() {
    console.log('In constructor');
    super();
    console.log('Before Get');
    api.get('/').then(response => {
      console.log('response.data');
      console.log(response.data);
    })
  }

  render() {
    return (
      <div>
        <h1>Helllo!</h1>
      </div>
    );
  }
}