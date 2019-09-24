import React from 'react'
import { connect } from 'react-redux'

function ScoreView(props) {
  return (
    <div className="score-view not-selectable">
      <p className="score">Score: <span>{props.score}</span></p>
      <p className="lines-complete">Lines: Cleared: {props.linesCleared}</p>
    </div>
  ) 
}

const mapStateToProps = (state) => {
  return {
    score: state.game.score,
    linesCleared: state.game.linesCleared,
    isRunning: state.game.isRunning,
    gameOver: state.game.gameOver
  }
}

const mapDispatchToProps = () => {
  return {
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(ScoreView)