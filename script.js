// Variables
const snake = document.createElement("div")
const circle = document.createElement("div")
const currentSpan = document.querySelector(".current")
const bestSpan = document.querySelector(".best")

let headPosition = [
  {
    x: 5,
    y: 7,
  },
]
let circlePosition = {
  x: null,
  y: null,
}
let direction
let nextDirection
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
}
const createSnake = () => {
  //snake
  snake.style.width = "30px"
  snake.style.height = "30px"
  snake.style.backgroundColor = "coral"
  document.querySelector("main").append(snake)
  snake.style.position = "relative"
  snake.style.top = `${headPosition[0].y * -30}px`
  snake.style.left = `${headPosition[0].x * 30}px`
}
const circlePlace = () => {
  //circle
  circlePosition.x = Math.floor(Math.random() * 15 - 1)
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
    headPosition[0].y <= 0 ||
    headPosition[0].y >= 16 ||
    headPosition[0].x <= -1 ||
    headPosition[0].x >= 15
  ) {
    direction = null
    headPosition = [
      {
        x: 5,
        y: 7,
      },
    ]
    clearInterval(id)
    active = false
    current = 0
    currentSpan.innerText = current.toString()
  } else {
    if (direction === "RIGHT") headPosition[0].x += 1
    else if (direction === "LEFT") headPosition[0].x -= 1
    else if (direction === "UP") headPosition[0].y += 1
    else headPosition[0].y -= 1
    snake.style.top = `${headPosition[0].y * -30}px`
    snake.style.left = `${headPosition[0].x * 30}px`
    if (
      headPosition[0].y === circlePosition.y &&
      headPosition[0].x === circlePosition.x + 1
    ) {
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
    headPosition[0].y != 1
  ) {
    direction = "DOWN"
  } else if (
    event.code === "ArrowUp" &&
    direction != "DOWN" &&
    headPosition[0].y != 15
  ) {
    direction = "UP"
  } else if (
    event.code === "ArrowRight" &&
    direction != "LEFT" &&
    headPosition[0].x != 14
  ) {
    direction = "RIGHT"
  } else if (
    event.code === "ArrowLeft" &&
    direction != "RIGHT" &&
    headPosition[0].x != 0
  ) {
    direction = "LEFT"
  }
})

//init
createBoard()
createSnake()
circlePlace()
