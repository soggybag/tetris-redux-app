import React, { Component } from 'react'
import { connect } from 'react-redux'

import { pause, resume, restart } from '../actions'

function SideBar(props) {
  const { isRunning, level, resume, pause, restart, gameOver } = props

  return (
    <div className="score-board">
      <div className="not-selectable">Level: {level}</div>

      <button className="score-board-button not-selectable" onClick={(e) => {
        if (gameOver) { return }
        isRunning ? pause() : resume()
      }}>{isRunning ? "Pause" : "Resume"}</button>


      <button className="score-board-button not-selectable" onClick={(e) => {
        restart()
      }}>Restart</button>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    score: state.game.score,
    isRunning: state.game.isRunning,
    gameOver: state.game.gameOver,
    level: state.game.level
  }
}

const mapDispatchToProps = () => {
  return {
    pause,
    resume,
    restart
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(SideBar)
