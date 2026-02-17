'use strict'

const MINE = '💣'
const FLAG = '🚩'
const NORMALSMILE = '😀'
const WINNERSMILE = '😎'
const LOSESMILE = '😵'


const gElSmile = document.querySelector('.smile span')//why dont do a gEl for each elemnt?

var gBoard
var gStartTimer
var gTimerInterval

const gLevel = {
    SIZE: 4, //setDIF()//8
    MINES: 3//14
}
const gGame = {
    isOn: false,
    isTimer: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3
}//move to cell.js?

function onInit() {
    gGame.isOn = false
    gGame.revealedCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.lives = 3
    gGame.isTimer = false

    gElSmile.innerText = NORMALSMILE

    resetTimer()
    gBoard = buildBoard()
    renderBoard(gBoard)


    const elMinesSpan = document.querySelector('.count-mines span')
    elMinesSpan.innerText = gLevel.MINES

    const elLifeSpan = document.querySelector('.lives span')
    elLifeSpan.innerText = gGame.lives
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])


        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    return board
}

function renderBoard(board) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            
            const currCell = board[i][j]
            const className = `cell cell-${i}-${j}`
            
            var cellText = ''
            
            if (currCell.isRevealed) {
                cellText = currCell.isMine ? MINE : currCell.minesAroundCount
                
                if (cellText === 0) {
                    cellText = ''
                }
            }
            // else if(currCell.isRevealed === false ) currCell += ''
            strHTML += `<td class=" ${className}"
            onclick="onCellClicked(this, ${i} , ${j})"
            oncontextmenu="onCellMarked(this, ${i} , ${j},event)"
            >
            ${cellText}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += '</tbody></table>'
    
    const elContainer = document.querySelector(`.board-container`)
    elContainer.innerHTML = strHTML
}

function checkGameOver() {
    if ((gLevel.SIZE ** 2 - gLevel.MINES) === gGame.revealedCount) {
        gElSmile.innerText = WINNERSMILE
        resetTimer()

        gGame.isOn = false
        gGame.isTimer = false
    }

}

function gameOver() {

    gElSmile.innerText = LOSESMILE
    resetTimer()
    gGame.isOn = false


}

function starTimer() {
    gStartTimer = Date.now()
    gTimerInterval = setInterval(() => {
        var diff = Date.now() - gStartTimer

        gGame.secsPassed = Math.floor(diff / 1000)
        const elTimer = document.querySelector('.timer span') // why not do  a gEltimer and use it
        elTimer.innerText = gGame.secsPassed
    }, 1000)
}

function resetTimer() {
    const elTimer = document.querySelector(`.timer span`)
    elTimer.innerText = gGame.secsPassed
    clearInterval(gTimerInterval)
    gGame.isTimer = false
    
}
function setDiffecultiy(size, mines) {
    gLevel.SIZE = +size
    gLevel.MINES = +mines

    onInit()
}
