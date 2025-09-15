const buttons = document.querySelectorAll(".level button")
let choice = "EASY"

document.querySelector(".start").addEventListener("click", () => {
  window.location.href = `./game.html?level=${choice}`
})

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index === 0) {
      buttons[0].style.backgroundColor = " rgb(180, 180, 180)"
      buttons[1].style.backgroundColor = "white"
      choice = "EASY"
    } else {
      buttons[0].style.backgroundColor = "white"
      buttons[1].style.backgroundColor = " rgb(180, 180, 180)"
      choice = "HARD"
    }
  })
})
