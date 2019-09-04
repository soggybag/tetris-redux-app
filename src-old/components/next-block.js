import React, { Component } from 'react'
import { connect } from 'react-redux'

import GridSquare from './grid-square'

import { shapes } from '../utils'

// Draws the "next" block view showing the next block to drop

class NextBlock extends Component {

  makeGrid() {
    const { shape } = this.props    // deconstruct shape
    const block = shapes[shape][0]  // get the array for this shape first rotation
    const box = shapes[0][0]        // get the empty shape

    // Map the block to the grid
    return box.map((rowArray, row) => {
      return rowArray.map((square, col) => {
        const color = block[row][col] === 0 ? 0 : shape // If there is a 1 use the shape index
        return <GridSquare key={`${row}${col}`} color={color} />
      })
    })
  }

  render () {

    return (
      <div className="next-block">
        {this.makeGrid()}
      </div>
    )
  }
}

// Map State to props
const mapStateToProps = (state) => {
  return {
    // Return nextShape as shape
    shape: state.game.nextShape
  }
}

// Conect this component
export default connect(mapStateToProps)(NextBlock)
