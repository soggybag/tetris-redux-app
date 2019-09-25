import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate } from '../actions'

import LeftArrow from '../svg/chevron-left-solid.svg'
import rightArrow from '../svg/chevron-right-solid.svg'
import rotateIcon from '../svg/sync-alt-solid.svg'
import downArrow from '../svg/chevron-down-solid.svg'

class Controls extends Component {

  render() {
    const { isRunning, gameOver } = this.props

    return (
      <div className="controls">
        {/* left */}
        <button className="control-button" onClick={(e) => {
          console.log(isRunning, gameOver)
          if (!isRunning || gameOver) { return }
          this.props.moveLeft()
        }}><img src={LeftArrow} /></button>

        {/* right */}
        <button className="control-button" onClick={(e) => {
          if (!isRunning || gameOver) { return }
          this.props.moveRight()
        }}><img src={rightArrow} /></button>

        {/* rotate */}
        <button className="control-button" onClick={(e) => {
          if (!isRunning || gameOver) { return }
          this.props.rotate()
        }}><img src={rotateIcon} /></button>

        {/* down */}
        <button className="control-button" onClick={(e) => {
          if (!isRunning || gameOver) { return }
          this.props.moveDown() // 
        }}><img src={downArrow} /></button>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRunning: state.game.isRunning,
    gameOver: state.game.gameOver
  }
}

const mapDispatchToProps = () => {
  return {
    moveRight,
    moveLeft,
    moveDown,
    rotate
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Controls)
