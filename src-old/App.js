import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'

import GridBoard from './components/grid-board'
import NextBlock from './components/next-block'
import ScoreBoard from './components/score-board'
import Controls from './components/controls'
import MessagePopup from './components/message-popup'

import './App.css';

const store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Tetris Redux</h1>
          </header>
          <GridBoard />
          <NextBlock />
          <ScoreBoard />
          <Controls />
          <MessagePopup />
        </div>
      </Provider>
    );
  }
}

export default App;

// Testing with
// https://blog.bitsrc.io/testing-your-react-app-with-puppeteer-and-jest-c72b3dfcde59
