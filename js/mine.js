"use strict"

function setMines(board, clickI, clickJ) {
  for (var mines = 0; mines < gLevel.MINES; mines++) {
    var emptyPos = findEmptyCell(board)
    if (emptyPos.i === clickI && emptyPos.j === clickJ) {
      mines--
      continue
    }
    board[emptyPos.i][emptyPos.j].isMine = true
  }
}

function checkMine(elCell, currCell) {
  gGame.lives--

  document.querySelector(".lives span").innerText = gGame.lives

  if (gGame.lives === 0) {
    gameOver()
    return
  }

  elCell.classList.add("revealed")

  elCell.innerText = MINE

  setTimeout(() => {
    elCell.classList.remove("revealed")
    elCell.innerText = ""

    currCell.isRevealed = false
  }, 1000)
}

function revealMine() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isMine) {
        gBoard[i][j].isMarked = true
        var elCell = document.querySelector(`.cell-${i}-${j}`)
        elCell.innerHTML = MINE
      }
    }
  }
}
