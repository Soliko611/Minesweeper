"use strict"

const gCellsColors = ["", "blue", "red", "green", "black","brown"]

function renderCell(i,j){
  var cell = gBoard[i][j]

  var elCell = document.querySelector(`.cell-${i}-${j}`)

  cell.isRevealed = true
  
    var count = cell.minesAroundCount
    elCell.innerText = count === 0 ? "" : count
    elCell.style.color = gCellsColors[count]
    elCell.classList.add('revealed')
    gGame.revealedCount++
}

function onCellClicked(elCell, i, j) {
  var currCell = gBoard[i][j]

  if (currCell.isMarked || currCell.isRevealed ) return

  if(!gGame.isOn && gGame.revealedCount > 0 )return
  if (gGame.revealedCount === 0) {
    setMines(gBoard, i, j)
    setMinesNegsCount(gBoard)
    starTimer()

    gGame.isOn = true
  
  }

  if (currCell.isMine) {
    checkMine(elCell, currCell)
    return
  }

  if (currCell.minesAroundCount === 0) {
    expandReveal(gBoard, i, j)
    checkGameOver()
    return
  }

  renderCell(i,j)
  checkGameOver()
}

function onCellMarked(elCell, i, j, ev) {
  ev.preventDefault()

  const elMinesSpan = document.querySelector(".count-mines span")

  var cell = gBoard[i][j]

  if (cell.isRevealed || !gGame.isOn) return

  var minesLeft = gLevel.MINES - gGame.markedCount

  if (minesLeft === 0 && !cell.isMarked) return

  if (!cell.isMarked) {
    cell.isMarked = true
    gGame.markedCount++
    elCell.innerText = FLAG
  } else {
    cell.isMarked = false
    gGame.markedCount--
    elCell.innerText = ""
  }

  elMinesSpan.innerText = gLevel.MINES - gGame.markedCount
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var count = minesAroundCount(board, i, j)

      board[i][j].minesAroundCount = count
    }
  }
}
function minesAroundCount(board, cellI, cellJ) {
  var count = 0

  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (i === cellI && j === cellJ) continue

      if (board[i][j].isMine) count++
    }
  }
  return count
}

function expandReveal(board, cellI, cellJ) {
  var cell = board[cellI][cellJ]

    if (cell.isRevealed || cell.isMine || cell.isMarked) return
    
     renderCell(cellI,cellJ)

    if(cell.minesAroundCount === 0 ){

        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= board.length) continue
            
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= board[0].length) continue
                if (i === cellI && j === cellJ) continue
               
                expandReveal(gBoard, i, j)
            }
        }
    }
  }