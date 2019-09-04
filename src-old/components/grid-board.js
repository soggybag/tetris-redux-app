import React, { Component } from 'react'
import { connect } from 'react-redux'

import GridSquare from './grid-square'

import { moveDown } from '../actions'
import { shapes } from '../utils'

// Represents a 10 x 18 grid of grid squares

class GridBoard extends Component {

  constructor(props) {
    super(props)

    this.lastUpdateTime = 0
    this.progressTime = 0
  }

  componentDidMount() {
    window.requestAnimationFrame(this.update.bind(this))
  }

  // Handle game updates
  update(time) {
    window.requestAnimationFrame(this.update.bind(this))
    if (!this.props.isRunning) {
      return
    }

    if (!this.lastUpdateTime) {
      this.lastUpdateTime = time
    }

    const deltaTime = time - this.lastUpdateTime
    this.progressTime += deltaTime
    if (this.progressTime > this.props.speed) {
      this.props.moveDown()
      this.progressTime = 0
    }

    this.lastUpdateTime = time
  }

  makeGrid() {
    const { grid, shape, rotation, x, y } = this.props
    const block = shapes[shape][rotation]
    const blockColor = shape
    // map rows
    return grid.map((rowArray, row) => {
      // map columns
      return rowArray.map((square, col) => {
        const blockX = col - x
        const blockY = row - y
        let color = square
        // Map current falling block to grid
        if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
          color = block[blockY][blockX] === 0 ? color : blockColor
        }
        // Generate a unique key for every block
        const k = row * grid[0].length + col;
        // Generate a grid square
        return <GridSquare
                key={k}
                square={square}
                color={color}>
                {square}
              </GridSquare>
      })
    })
  }

  render () {
    return (
      <div className='grid-board'>
        {this.makeGrid()}
      </div>
    )
  }
}

// Map state to props
const mapStateToProps = (state) => {
  return {
    grid: state.game.grid,
    shape: state.game.shape,
    rotation: state.game.rotation,
    x: state.game.x,
    y: state.game.y,
    speed: state.game.speed,
    isRunning: state.game.isRunning
  }
}

// Map Dipatch to Props
const mapDispatchToProps = () => {
  return {
    moveDown
  }
}

// Connect the component
export default connect(mapStateToProps, mapDispatchToProps())(GridBoard)
