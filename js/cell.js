'use strict'

const gCellsColors = ['','blue','red','green','black']

function onCellClicked(elCell, i, j) {

    var currCell = gBoard[i][j]

    if (gGame.revealedCount === 0) {
        setMines(gBoard, i, j)
        setMinesNegsCount(gBoard) 
        gGame.isOn = true
    }
    if (currCell.isMarked || currCell.isRevealed || !gGame.isOn) return

    if (!gGame.isTimer) {
        starTimer()
        gGame.isTimer = true
    }


    if (currCell.isMine) {
        // gLevel.MINES--
        checkMine(elCell, currCell)
        return
    }

    currCell.isRevealed = true
    gGame.revealedCount++

    var count = currCell.minesAroundCount
    elCell.innerText = (count === 0) ? '' : count

    elCell.style.color = gCellsColors[count]
    
    elCell.classList.add('revealed')


    checkGameOver()
}
function checkMine(elCell, currCell) {

    gGame.lives--

    document.querySelector('.lives span').innerText = gGame.lives

    if (gGame.lives === 0) {
        gameOver()
        return
    }


    elCell.classList.add('revealed')
    elCell.innerText = MINE

    setTimeout(() => {
        elCell.classList.remove('revealed')
        elCell.innerText = ''

        currCell.isRevealed = false
        currCell.isMarked = false



    }, 1000)


}

function onCellMarked(elCell, i, j, ev) {

    ev.preventDefault()

    const elMinesSpan = document.querySelector('.count-mines span')

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
        elCell.innerText = ''

    }


    elMinesSpan.innerText = gLevel.MINES - gGame.markedCount

}

//bug when all cell revel and there one mine left the game stop/