
// Generates Random numbers in a range
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Returns the default grid
export const gridDefault = () => {
  const rows = 18
  const cols = 10
  const array = []
  for (let row = 0; row < rows; row++) {
    array.push([])
    for (let col = 0; col < cols; col++) {
      array[row].push(0)
    }
  }
  return array
}

// Return a random shape
export const randomShape = () => {
  return random(1, shapes.length - 1)
}

// Return the default state for the game
export const defaultState = () => {
  return {
    grid: gridDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 5,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    linesCleared: 0,
    level: 1,
    speed: 1000,
    gameOver: false
  }
}

// Returns the next rotation for a shape
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]

  let max_x = 0 // right most x
  let min_x = 3 // left most x
  for ( let r = 0; r < 4 ; r++){
    for ( let c = 0; c < 4; c++){
      if(currentShape[r][c] == 1){
        if(max_x < c){
          max_x = c
        }
        if( min_x > c){
          min_x = c
        }
      }
    }
  }
  console.log(("max_x:" + (x + max_x)))
  console.log(("min_x:" + (x + min_x)))

  if(min_x + x < 0 || max_x + x > 9){
    console.log("shape out of bounds")
    return false
  }

  // Loop through all rows and cols of the **shape**
  for (let row = 0; row < currentShape.length; row++) {         // Loop through rows
    for (let col = 0; col < currentShape[row].length; col++) {  // Loop through cols
      if (currentShape[row][col] !== 0) {                       // Look for a 1 here
        const proposedX = col + x                               // x offset on grid
        const proposedY = row + y                               // y offset on grid
        if (proposedY < 0) {
          continue
        }
        const possibleRow = grid[proposedY]                     // Get the row on the grid
        if (possibleRow) {                                      // Check row exists
          // Check this column in the row undefined and it's off the edges, 0 and it's empty
          if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {                         // check the contents
            return false // undefined or not 0 and it's occupied we can't move here.
          }
        } else {
          return false
        }
      }
    }
  }
  return true
}

// Adds current shape to grid
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  let blockOffGrid = false
  const block = shapes[shape][rotation]
  const newGrid = [ ...grid ]
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        // TODO: Find game over when block can't b placed.
        const yIndex = row + y
        // const xIndex = col + x

        if (yIndex < 0) {
          blockOffGrid = true
        } else {
          newGrid[row + y][col + x] = shape
        }
      }
    }
  }
  console.log(`addBlockToGrid: ${blockOffGrid}`)
  return { grid: newGrid, gameOver: blockOffGrid }
}

// Checks for completed rows and scores points
export const checkRows = (grid) => {
  const points = [0, 40, 100, 300, 1200]
  let completedRows = 0
  for (let row = 0; row < grid.length; row++) {
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1
      grid.splice(row, 1)
      grid.unshift(Array(10).fill(0))
    }
  }
  return { score: points[completedRows], rowsCleared: completedRows}
}

export const checkHighscore = (state) => {
  const tetrisStore = window.localStorage;
  const currentScore = state.score
  const previousScore = parseInt(tetrisStore.getItem('tetris'))
  if (currentScore > previousScore) {
    tetrisStore.setItem('tetris', currentScore)
  }
  tetrisStore.setItem('tetris', currentScore)
}

// Define block shapes and their rotations as arrays.
export const shapes = [
  // none
  [[[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]]],
  // I
  [[[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]]],

  // T
  [[[0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // L
  [[[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],

   [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]],

  // J
  [[[1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],

   [[0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],

   [[0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]]],

  // Z
  [[[0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],

   [[0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],

  // S
  [[[0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]],

   [[0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]]],

  // O
  [[[0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]]]
]
