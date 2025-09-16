const buttons = document.querySelectorAll(".level button")
const allButtons = document.querySelectorAll("button")
let choice = "EASY"

const playSound = (filePath) => {
  const audio = new Audio(filePath)
  audio.currentTime = 0
  audio.play()
}

document.querySelector(".start").addEventListener("click", () => {
  window.location.href = `./game.html?level=${choice}`
})

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    playSound("./audio/computer-mouse-click-352734.mp3")
    if (index === 0) {
      buttons[0].style.backgroundColor = " rgb(180, 180, 180)"
      buttons[1].style.backgroundColor = "white"
      buttons[0].style.padding = "4px 17px"
      buttons[1].style.padding = "5px 20px"
      choice = "EASY"
    } else {
      buttons[0].style.backgroundColor = "white"
      buttons[1].style.backgroundColor = " rgb(180, 180, 180)"
      buttons[1].style.padding = "4px 17px"
      buttons[0].style.padding = "5px 20px"
      choice = "HARD"
    }
  })
})
