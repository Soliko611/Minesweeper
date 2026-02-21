"use strict"

const MINE = "💣"
const FLAG = "🚩"
const NORMALSMILE = "😀"
const WINNERSMILE = "😎"
const LOSESMILE = "😵"
const LIGHTMODE = "🌞"
const NIGHTMODE = "🌚"

const gElSmile = document.querySelector(".smile span")

var gBoard
var gStartTimer
var gTimerInterval

const gLevel = {
  SIZE: 4, //setDIF()//8
  MINES: 3,
}

var gGame = {
  isOn: false,
  isTimer: false,
  revealedCount: 0,
  markedCount: 0,
  secsPassed: 0,
  lives: 3,
}

function onInit() {
  gGame.isOn = false
  gGame.revealedCount = 0
  gGame.markedCount = 0
  gGame.secsPassed = 0
  gGame.lives = 3

  gUndoHistory.length = 0

  gElSmile.innerText = NORMALSMILE

  const elLightBtn = document.querySelector(".theme-btn span")
  elLightBtn.innerText = LIGHTMODE

  resetTimer()
  gBoard = buildBoard()
  renderBoard(gBoard)
  renderBestTime()

  const elMinesSpan = document.querySelector(".count-mines span")
  elMinesSpan.innerText = gLevel.MINES

  const elLifeSpan = document.querySelector(".lives span")
  elLifeSpan.innerText = gGame.lives
}

function gameOver() {
  gElSmile.innerText = LOSESMILE
  resetTimer()
  gGame.isOn = false
}

function setDiffecultiy(size, mines) {
  gLevel.SIZE = +size
  gLevel.MINES = +mines

  onInit()
}

function resetTimer() {
  const elTimer = document.querySelector(`.timer span`)
  elTimer.innerText = gGame.secsPassed
  clearInterval(gTimerInterval)
  gGame.isTimer = false //delete that timer
}

function checkGameOver() {
  if (
    gLevel.SIZE ** 2 - gLevel.MINES === gGame.revealedCount &&
    gGame.markedCount === gLevel.MINES
  ) {
    gElSmile.innerText = WINNERSMILE
    checkBestScore(gGame.secsPassed)
    resetTimer()
    revealMine()
    gGame.isOn = false
  }
}

function toogleLightMode() {
  const elLightBtn = document.querySelector(".theme-btn span")
  const elBody = document.body
  elBody.classList.toggle("light-mode")

  if (elBody.classList.contains("light-mode")) {
    elLightBtn.innerText = NIGHTMODE
  } else {
    elLightBtn.innerText = LIGHTMODE
  }
}
function checkBestScore(newTime) {
  var key = gLevel.SIZE
  var bestTime = localStorage.getItem(key)

  if (bestTime === null || newTime < +bestTime) {
    localStorage.setItem(key, newTime)
    renderBestTime()
  }
}
function renderBestTime() {
  var key = gLevel.SIZE
  var bestTime = localStorage.getItem(key)

  var elBestTime = document.querySelector(".best-time span")

  if (bestTime !== null) {
    elBestTime.innerText = bestTime
  } else {
    elBestTime.innerText = "No Best Time"
  }
}
