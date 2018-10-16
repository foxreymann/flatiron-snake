import './style.css';

// get the canvas element and context
const canvasElement = document.getElementById('game-canvas')
const canvasContext = canvasElement.getContext('2d')

// some nokia colours
const screenColor = '#56b44b'
const pixelColor = '#336c2d'

// size constraints
const tileSize = 20
const gridSize = 25

const applePosition = {
  x: 15,
  y: 15
}

const headPosition = {
  x: 10,
  y: 10
}

let snakeLength = 5
const snakeBits = []

const velocity = {
  x: 0,
  y: -1
}

const draw = () => {
  // draw background
  canvasContext.fillStyle = screenColor
  canvasContext.fillRect(
    0,
    0,
    canvasElement.width,
    canvasElement.height
  )

  // draw apple
  canvasContext.fillStyle = pixelColor
  canvasContext.fillRect(
    applePosition.x * tileSize,
    applePosition.y * tileSize,
    tileSize,
    tileSize
  )

  // draw snake head
  snakeBits.forEach(
    coordinate => {
      canvasContext.fillStyle = pixelColor
      canvasContext.fillRect(
        coordinate.x * tileSize,
        coordinate.y * tileSize,
        tileSize,
        tileSize
      )
    }
  )
  
}

const updateHeadPosition = () => {
  headPosition.x += velocity.x
  headPosition.y += velocity.y

  if (headPosition.x > gridSize) {
    headPosition.x = 0
  } else if (headPosition.x < 0) {
    headPosition.x = gridSize
  } else if (headPosition.y > gridSize) {
    headPosition.y = 0
  } else if (headPosition.y < 0) {
    headPosition.y = gridSize 
  }
}

const updateSnakeBits = () => {
  if (snakeBits.length < snakeLength) {
    snakeBits.push(
      {
        x: headPosition.x,
        y: headPosition.y
      }
    )
  }
}

// this is called every frame
const update = () => {

  updateSnakeBits()

  updateHeadPosition()

  if (headPosition.x === applePosition.x && headPosition.y === applePosition.y) {
    setRandomApplePosition()
    snakeLength++
    console.log(snakeLength)
  }

  draw()
}

// call update every 100ms
setInterval(update, 100)

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const setRandomApplePosition = () => {
  applePosition.x = getRandomInt(0, gridSize)
  applePosition.y = getRandomInt(0, gridSize)
}

// const handleCanvasClick = event => {
//   setRandomApplePosition()
// }

// canvasElement.addEventListener('click', handleCanvasClick)

const handleKeyDown = event => {
  if (event.code === "ArrowRight") {
    velocity.y = 0
    velocity.x = 1
  } else if (event.code === "ArrowLeft") {
    velocity.y = 0
    velocity.x = -1
  } else if (event.code === "ArrowUp") {
    velocity.y = -1
    velocity.x = 0
  } else if (event.code === "ArrowDown") {
    velocity.y = 1
    velocity.x = 0
  }
}

document.addEventListener('keydown', handleKeyDown)