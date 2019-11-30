import React, { Component } from 'react'
import { connect } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate } from '../actions'

import leftArrow from '../svg/chevron-left-solid.svg'
import rightArrow from '../svg/chevron-right-solid.svg'
import rotateIcon from '../svg/sync-alt-solid.svg'
import downArrow from '../svg/chevron-down-solid.svg'

class Controls extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyboardActions)
  }

  handleKeyboardActions = (event) => {
    const { isRunning, gameOver } = this.props;
    if (!isRunning || gameOver) { return }

    switch (event.keyCode) {
       case 38: { // up
         //Prevent default window scroll on Up/Down arrow, SpaceBar key press
         event.preventDefault();
         this.props.rotate();
         break;
       }
       case 40: { // down
         event.preventDefault();
         this.props.rotate();
         break;
       }
       case 37: this.props.moveLeft(); break;
       case 39: this.props.moveRight(); break;
       case 32: { // space-bar
         event.preventDefault();
         this.props.moveDown();
         break;
       }
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', () => {console.log("removed")});
  }

  render() {
    const { isRunning, gameOver } = this.props;
    const controlButton = (onClick, icon, title) => {
       return (
           <button className="control-button not-selectable" title={title} onClick={(e) => {
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
        {controlButton(moveLeft, {url: leftArrow, alt: "Left Arrow Symbol"}, "Left Key" )}

        {/* right */}
        {controlButton(moveRight, {url: rightArrow, alt: "Right Arrow Symbol"}, "Right Key" )}

        {/* rotate */}
        {controlButton(rotate, {url: rotateIcon, alt: "Rotate Arrow Symbol"}, "Up/Down Key" )}

        {/* down */}
        <button className="control-button" title="Space Bar"
        onClick={moveDown}
        >
          <img alt="Move Down Arrow" src={downArrow} /></button>

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
