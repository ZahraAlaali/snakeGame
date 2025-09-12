// Variables
let allDivs
const circle = document.createElement("div")
const currentSpan = document.querySelector(".current")
const bestSpan = document.querySelector(".best")

let snakePosition = [
  {
    x: 5,
    y: 7,
  },
  {
    x: 4,
    y: 7,
  },
]
let circlePosition = {
  x: null,
  y: null,
}
let direction
let active = false
let current = 0
let best = 0

// Functions
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
const placeSnake = () => {
  //snake
  for (let i = 0; i < snakePosition.length; i++) {
    let place = snakePosition[i].y * 15 + snakePosition[i].x
    allDivs[place].classList.add(i === 0 ? "snakeHead" : "snakeBody")
  }
}
const circlePlace = () => {
  //circle
  circlePosition.x = Math.floor(Math.random() * 15)
  circlePosition.y = Math.floor(Math.random() * 15 + 1)
  if (!active) {
    circle.style.width = "30px"
    circle.style.height = "30px"
    circle.style.borderRadius = "50%"
    circle.style.backgroundColor = "black"
    document.querySelector("main").append(circle)
    circle.style.position = "relative"
  }
  circle.style.top = `${circlePosition.y * -30}px`
  circle.style.left = `${circlePosition.x * 30}px`
}
const frame = () => {
  if (
    snakePosition[0].y <= 0 ||
    snakePosition[0].y >= 16 ||
    snakePosition[0].x <= 0 ||
    snakePosition[0].x >= 16
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
  } else {
    if (direction === "RIGHT") {
      snakePosition[0].x += 1
    } else if (direction === "LEFT") {
      snakePosition[0].x -= 1
    } else if (direction === "UP") {
      snakePosition[0].y += 1
    } else {
      snakePosition[0].y -= 1
    }
    placeSnake()
    if (
      snakePosition[0].y === circlePosition.y &&
      snakePosition[0].x === circlePosition.x
    ) {
      //increase the size of the snake
      current += 1
      currentSpan.innerText = current.toString()
      if (current > best) {
        bestSpan.innerText = current.toString()
        best = current
      }
      console.log(currentSpan)
      circlePlace()
    }
  }
}

// Events
document.addEventListener("keydown", (event) => {
  if (!active) {
    id = setInterval(frame, 300)
    active = true
  }
  if (
    event.code === "ArrowDown" &&
    direction != "UP" &&
    snakePosition[0].y != 1
  ) {
    direction = "DOWN"
  } else if (
    event.code === "ArrowUp" &&
    direction != "DOWN" &&
    snakePosition[0].y != 15
  ) {
    direction = "UP"
  } else if (
    event.code === "ArrowRight" &&
    direction != "LEFT" &&
    snakePosition[0].x != 14
  ) {
    direction = "RIGHT"
  } else if (
    event.code === "ArrowLeft" &&
    direction != "RIGHT" &&
    snakePosition[0].x != 0
  ) {
    direction = "LEFT"
  }
})

//init
createBoard()
placeSnake()
circlePlace()
