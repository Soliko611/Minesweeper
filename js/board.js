"use strict"

function buildBoard() {
  const board = []

  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([])

    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false,
      }
    }
  }

  return board
}

function renderBoard(board) {
  var strHTML = "<table><tbody>"
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      var className = `cell cell-${i}-${j}`

      var cellContent = ""

      if (currCell.isRevealed) {
        // var color = gCellsColors[currCell.minesAroundCount]
        cellContent = currCell.isMine ? MINE : currCell.minesAroundCount
        className += " revealed"

        if (cellContent === 0) {
          cellContent = ""
        }
      } else if (currCell.isMarked) {
        cellContent = FLAG
      }

      strHTML += `<td class=" ${className}"
            onclick="onCellClicked(this, ${i} , ${j})"
            oncontextmenu="onCellMarked(this, ${i} , ${j},event)"
            >
            ${cellContent}</td>`
    }
    strHTML += `</tr>`
  }
  strHTML += "</tbody></table>"

  const elContainer = document.querySelector(`.board-container`)
  elContainer.innerHTML = strHTML
}
