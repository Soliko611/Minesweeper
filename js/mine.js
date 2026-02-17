'use strict'


function minesAroundCount(board, cellI, cellJ) {//utils?
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

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var count = minesAroundCount(board, i, j)

            board[i][j].minesAroundCount = count
        }
    }
}

function setMines(board, clickI, clickJ) {


    for (var mines = 0; mines < gLevel.MINES; mines++) {
        var emptyPos = findEmptyCell(board) //setdiff
        if (emptyPos.i === clickI && emptyPos.j === clickJ) {
            mines--
            continue
        }
        board[emptyPos.i][emptyPos.j].isMine = true
    }
}


function expandReveal(board, elCell, cellI, cellJ) {
    if(board[cellI][cellJ].minesAroundCount === 0 ){

        if (!board[cellI][cellJ].isMine) {
            
            for (var i = cellI - 1; i <= cellI + 1; i++) {
                if (i < 0 || i >= board.length) continue
                
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {

                if (j < 0 || j >= board[0].length) continue
                if (i === cellI && j === cellJ) continue
                
                if (!board[i][j].isMine) {
                    board[i][j].isRevealed = true
                    gGame.revealedCount++
                }
            }
            
            
        }
    }
    }
}