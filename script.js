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
let direction = "RIGHT"
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
const circlePlace = () => {
  //circle
  let x = Math.floor(Math.random() * 15)
  let y = Math.floor(Math.random() * 15 + 1)
  circlePosition.x = x
  circlePosition.y = -1 * y + 15
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
const placeSnake = () => {
  //snake
  console.log("place snake")
  for (let i = 0; i < snakePosition.length; i++) {
    console.log("place snake in loop")
    let place = snakePosition[i].y * 15 + snakePosition[i].x
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

const modifySnakePosition = () => {
  let place =
    snakePosition[snakePosition.length - 1].y * 15 +
    snakePosition[snakePosition.length - 1].x
  // remove the tail
  allDivs[place].classList.remove("snakeBody")
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
  placeSnake()
}
const frame = () => {
  if (
    snakePosition[0].y < 0 ||
    snakePosition[0].y > 14 ||
    snakePosition[0].x < 0 ||
    snakePosition[0].x > 14
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
    console.log(snakePosition)
    console.log(circlePosition)
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
}

// Events
document.addEventListener("keydown", (event) => {
  if (!active) {
    id = setInterval(frame, 300)
    active = true
  }
  if (event.code === "ArrowDown" && direction != "UP") {
    direction = "DOWN"
  } else if (event.code === "ArrowUp" && direction != "DOWN") {
    direction = "UP"
  } else if (event.code === "ArrowRight" && direction != "LEFT") {
    direction = "RIGHT"
  } else if (event.code === "ArrowLeft" && direction != "RIGHT") {
    direction = "LEFT"
  }
})

//init
createBoard()
placeSnake()
circlePlace()
