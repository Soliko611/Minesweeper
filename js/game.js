"use strict"

const MINE = "💣"
const FLAG = "🚩"
const NORMALSMILE = "😀"
const WINNERSMILE = "😎"
const LOSESMILE = "😵"
const WHITEMODE = "🌞"
const DARKMODE = "🌚"

const gElSmile = document.querySelector(".smile span")

var gBoard
var gStartTimer
var gTimerInterval

const gLevel = {
  SIZE: 4, //setDIF()//8
  MINES: 3,
}

const gGame = {
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

  gElSmile.innerText = NORMALSMILE

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
  gGame.isTimer = false//delete that timer
}

function checkGameOver() {
  if (gLevel.SIZE ** 2 - gLevel.MINES === gGame.revealedCount && gGame.markedCount === gLevel.MINES) {
    gElSmile.innerText = WINNERSMILE
    checkBestScore(gGame.secsPassed)
    resetTimer()
    revealMine()
    gGame.isOn = false
  
  }
}

function revealMine() {

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isMine) {
        gBoard[i][j].isMarked = true
        var elCell = document.querySelector(`.cell-${i}-${j}`)
        elCell.innerHTML = FLAG
      }
    }
  }
}

// function toogleDarkMode() {

// }
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
