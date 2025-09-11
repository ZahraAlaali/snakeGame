// Variables

// Functions
const createBoard = () => {
  console.log("inside a function")
  for (let i = 0; i < 225; i++) {
    console.log(`inside loop ${i}`)
    let myDiv = document.createElement("div")
    myDiv.id = i.toString()
    if (i % 2 === 0) {
      myDiv.classList.add("even")
    } else {
      myDiv.classList.add("odd")
    }
    document.querySelector("main").append(myDiv)
  }
}

// Events
createBoard()
