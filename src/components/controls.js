import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate } from '../actions'

import leftArrow from '../svg/chevron-left-solid.svg'
import rightArrow from '../svg/chevron-right-solid.svg'
import rotateIcon from '../svg/sync-alt-solid.svg'
import downArrow from '../svg/chevron-down-solid.svg'

class Controls extends Component {

  render() {
    const { isRunning, gameOver } = this.props;
    const controlButton = (onClick, icon) => {
       return (
           <button className="control-button not-selectable" onClick={(e) => {
               onClick(e);
           }}><img src={icon.url} alt={icon.alt}/></button>
       )
    };

    const moveLeft = () => {
        console.log(isRunning, gameOver)
        if (!isRunning || gameOver) { return }
        this.props.moveLeft()
    };

    const moveRight = () => {
        if (!isRunning || gameOver) { return }
        this.props.moveRight()
    };

    const rotate = () => {
        if (!isRunning || gameOver) { return }
        this.props.rotate()
    };

    const moveDown = () => {
        if (!isRunning || gameOver) { return }
        this.props.moveDown()
    };

    return (
      <div className="controls">
        {/* left */}
        {controlButton(moveLeft, {url: leftArrow, alt: "Left Arrow Symbol"} )}

        {/* right */}
        {controlButton(moveRight, {url: rightArrow, alt: "Right Arrow Symbol"} )}

        {/* rotate */}
        {controlButton(rotate, {url: rotateIcon, alt: "Rotate Arrow Symbol"} )}

        {/* down */}
        {controlButton(moveDown, {url: downArrow, alt: "Down Arrow Symbol"} )}
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
