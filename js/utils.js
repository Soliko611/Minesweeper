'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function findEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (!currCell.isMine) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (emptyCells.length === 0) return null
    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)

    return emptyCells[randIdx]
}

function starTimer() {
    gStartTimer = Date.now()
    gTimerInterval = setInterval(() => {
        var diff = Date.now() - gStartTimer

        gGame.secsPassed = Math.floor(diff / 1000)
        const elTimer = document.querySelector('.timer span')
        elTimer.innerText = gGame.secsPassed
    }, 1000)
}

function copyBoard(){
  var newBoard = []
  for(var i = 0; i < gBoard.length; i++ ){
    newBoard.push([])
    for(var j = 0 ; j< gBoard[i].length;j++){
      newBoard[i][j] = {
        minesAroundCount: gBoard[i][j].minesAroundCount,
        isRevealed: gBoard[i][j].isRevealed,
        isMine: gBoard[i][j].isMine,
        isMarked: gBoard[i][j].isMarked,
      }
    }
  }
  return newBoard
}

function copyGame(){
  return {
  isOn: gGame.isOn,
  isTimer: gGame.isTimer,
  revealedCount: gGame.revealedCount,
  markedCount: gGame.markedCount,
  secsPassed: gGame.secsPassed,
  lives: gGame.lives,
}
}

