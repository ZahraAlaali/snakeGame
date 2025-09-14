// Variables
let allDivs
const circle = document.createElement("div")
const currentSpan = document.querySelector(".current")
const bestSpan = document.querySelector(".best")

let snakePosition = [
  {
    x: 4,
    y: 7,
  },
  {
    x: 3,
    y: 7,
  },
]
let circlePosition = {
  x: null,
  y: null,
}
let direction = "RIGHT"
let active = false
let current = 0
let best = 0

// Functions

// check it lose
const checkForLose = () => {
  if (
    snakePosition[0].y < 0 ||
    snakePosition[0].y > 14 ||
    snakePosition[0].x < 0 ||
    snakePosition[0].x > 14 ||
    touch()
  ) {
    direction = null
    snakePosition = [
      {
        x: 5,
        y: 7,
      },
      {
        x: 4,
        y: 7,
      },
    ]
    clearInterval(id)
    active = false
    current = 0
    currentSpan.innerText = current.toString()
    return true
  }
  return false
}
// Calculate the position of the snake
const calcPlace = (index) => {
  return snakePosition[index].y * 15 + snakePosition[index].x
}

// checks if the snake touches itself, return true when it does, false when its not
const touch = () => {
  for (let i = 1; i < snakePosition.length; i++) {
    if (
      snakePosition[0].x === snakePosition[i].x &&
      snakePosition[0].y === snakePosition[i].y
    ) {
      return true
    }
  }
  return false
}

// a function that creates the element div (the board)
const createBoard = () => {
  for (let i = 0; i < 225; i++) {
    const myDiv = document.createElement("div")
    myDiv.id = i.toString()
    if (i % 2 === 0) {
      myDiv.classList.add("even")
    } else {
      myDiv.classList.add("odd")
    }
    document.querySelector("main").append(myDiv)
  }
  allDivs = document.querySelectorAll("main div")
}

// checks if the position of the ball is on the snake or no
const onSnake = () => {
  for (let i = 0; i < snakePosition.length; i++) {
    if (
      snakePosition[i].x === circlePosition.x &&
      snakePosition[i].y === circlePosition.y
    ) {
      return true
    }
  }
  return false
}

// places the circle on the board with random place not on the snake
const circlePlace = () => {
  //circle
  let x
  let y
  do {
    x = Math.floor(Math.random() * 15)
    y = Math.floor(Math.random() * 15 + 1)
    circlePosition.x = x
    circlePosition.y = -1 * y + 15
  } while (onSnake())

  if (!active) {
    circle.style.width = "30px"
    circle.style.height = "30px"
    circle.style.borderRadius = "50%"
    circle.style.backgroundColor = "black"
    document.querySelector("main").append(circle)
    circle.style.position = "relative"
  }
  circle.style.top = `${y * -30}px`
  circle.style.left = `${x * 30}px`
  circle.style.visibility = "visible"
}

// places the snake on the board
const placeSnake = () => {
  //snake
  for (let i = 0; i < snakePosition.length; i++) {
    let place = calcPlace(i)
    if (i === 0) {
      allDivs[place].classList.add("snakeHead")
    } else {
      if (i === 1) {
        allDivs[place].classList.remove("snakeHead")
      }
      allDivs[place].classList.add("snakeBody")
    }
  }
}

// reassign the values for the position of the snake
const modifySnakePosition = () => {
  let place = calcPlace(snakePosition.length - 1)
  // remove the tail

  for (let i = snakePosition.length - 1; i >= 1; i--) {
    snakePosition[i].x = snakePosition[i - 1].x
    snakePosition[i].y = snakePosition[i - 1].y
  }
  if (direction === "RIGHT") {
    snakePosition[0].x += 1
  } else if (direction === "LEFT") {
    snakePosition[0].x -= 1
  } else if (direction === "UP") {
    snakePosition[0].y -= 1
  } else {
    snakePosition[0].y += 1
  }
  if (!checkForLose()) {
    allDivs[place].classList.remove("snakeBody")
    placeSnake()
  }
}

const frame = () => {
  if (
    snakePosition[0].y === circlePosition.y &&
    snakePosition[0].x === circlePosition.x
  ) {
    //increase the size of the snake
    snakePosition.push({ x: null, y: null })
    current += 1
    currentSpan.innerText = current.toString()
    if (current > best) {
      bestSpan.innerText = current.toString()
      best = current
    }
    circle.style.visibility = "hidden"
    circlePlace()
  }
  modifySnakePosition()
}

// Events
document.addEventListener("keydown", (event) => {
  console.log(event)
  if (!active) {
    id = setInterval(frame, 200)
    active = true
  }
  if (
    (event.code === "ArrowDown" || event.key.toUpperCase() === "S") &&
    direction != "UP"
  ) {
    direction = "DOWN"
  } else if (
    (event.code === "ArrowUp" || event.key.toUpperCase() === "W") &&
    direction != "DOWN"
  ) {
    direction = "UP"
  } else if (
    (event.code === "ArrowRight" || event.key.toUpperCase() === "D") &&
    direction != "LEFT"
  ) {
    direction = "RIGHT"
  } else if (
    (event.code === "ArrowLeft" || event.key.toUpperCase() === "A") &&
    direction != "RIGHT"
  ) {
    direction = "LEFT"
  }
})

//init
createBoard()
placeSnake()
circlePlace()
