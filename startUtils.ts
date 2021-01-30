export const addOne = (
  board: Array<Array<number>>,
  row: number,
  col: number
) => {
  for (const square of [col - 1, col + 1]) {
    if (square >= 0 && square <= 9) {
      board[row][square] != 9 ? (board[row][square] += 1) : null
    }
  }

  for (const squareRow of [row - 1, row + 1]) {
    if (squareRow >= 0 && squareRow <= 9) {
      for (const squareCol of [col - 1, col, col + 1]) {
        if (squareCol >= 0 && squareCol <= 9) {
          board[squareRow][squareCol] != 9
            ? (board[squareRow][squareCol] += 1)
            : null
        }
      }
    }
  }
}

export const generateBoard = (): Array<Array<number>> => {
  const board: Array<Array<number>> = new Array<Array<number>>(10)

  for (let i = 0; i < 10; i++) {
    const row = new Array<number>(10)
    for (let j = 0; j < 10; j++) {
      row[j] = 0
    }
    board[i] = row
  }

  return board
}

export const generateOpen = (): Array<Array<boolean>> => {
  const board: Array<Array<boolean>> = new Array<Array<boolean>>(10)

  for (let i = 0; i < 10; i++) {
    const row = new Array<boolean>(10)
    for (let j = 0; j < 10; j++) {
      row[j] = false
    }
    board[i] = row
  }

  return board
}

export const generateMines = (board: Array<Array<number>>): void => {
  const mineNumbers: Array<number> = []

  while (mineNumbers.length < 10) {
    const nextMine = Math.floor(Math.random() * 98) + 1
    if (
      mineNumbers.indexOf(nextMine) === -1 &&
      [9, 90].indexOf(nextMine) === -1
    ) {
      mineNumbers.push(nextMine)
    }
  }

  for (const mineNumber of mineNumbers) {
    const [row, col] = [Math.floor(mineNumber / 10), mineNumber % 10]
    board[row][col] = 9
    addOne(board, row, col)
  }
}

export const boardToDisplayStringArr = (
  board: Array<Array<number>>,
  open: Array<Array<boolean>>
): Array<string> => {
  const displayBoard: Array<string> = []

  for (let i = 0; i < 10; i++) {
    const boardRow = board[i]
    const openRow = open[i]
    const displayRow = []

    for (let j = 0; j < 10; j++) {
      if (openRow[j]) {
        if (boardRow[j] === 0) {
          displayRow.push(".")
        } else if (boardRow[j] === 9) {
          displayRow.push("M")
        } else {
          displayRow.push(`${boardRow[j]}`)
        }
      } else {
        displayRow.push("_")
      }
    }

    displayBoard.push(displayRow.join(" "))
  }

  return displayBoard
}
