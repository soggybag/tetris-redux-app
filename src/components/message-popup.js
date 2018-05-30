import React, { Component } from 'react'
import { connect } from 'react-redux'

import { restart } from '../actions'

// Displays a message

class MessagePopup extends Component {

  render() {
    const { gameOver, isRunning } = this.props
    let message = ''
    let isHidden = 'hidden'

    console.log('Message Popup')
    console.log(gameOver, isRunning)

    if (gameOver) {
      message = 'Game Over'
      isHidden = ''
    } else if (!isRunning) {
      message = 'Paused'
      isHidden = ''
    } else {
      message = '???'
    }

    return (
      <div className={`message-popup ${isHidden}`}>
        <h1>{message}</h1>
        <p></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gameOver: state.game.gameOver,
    isRunning: state.game.isRunning
  }
}

const mapDispatchToProps = () => {
  return {
    restart
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(MessagePopup)
