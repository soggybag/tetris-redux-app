import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'

import GridBoard from './components/grid-board'
import NextBlock from './components/next-block'
import ScoreBoard from './components/side-bar'
import Controls from './components/controls'
import MessagePopup from './components/message-popup'
import ScoreView from './components/ScoreView'

const store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <header className="header">
            <h1 className="App-title">Tetris Redux</h1>
          </header>
          <div className="App">
            <ScoreView />
            <GridBoard />
            <NextBlock />
            <ScoreBoard />
            <Controls />
            <MessagePopup />
          </div>
          <footer className="footer">
            <div>
              <p>Footer stuff</p>
            </div>
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;

// Testing with
// https://blog.bitsrc.io/testing-your-react-app-with-puppeteer-and-jest-c72b3dfcde59
