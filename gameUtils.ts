export const handleSelect = (
  gameBoard: number[][],
  openBoard: boolean[][],
  row: number,
  col: number
): boolean => {
  const checkRow = 0 <= row && row <= 9
  const checkCol = 0 <= col && col <= 9
  const checkIndex = checkRow && checkCol

  if (checkIndex) {
    if (gameBoard[row][col] === 9) {
      console.log("GAME OVER!")

      openAll(openBoard)

      return true
    }

    if (gameBoard[row][col] !== 0) {
      openBoard[row][col] = true
    }

    if (gameBoard[row][col] === 0) {
      openBoard[row][col] = true
      for (const squareCol of [col - 1, col + 1]) {
        if (
          squareCol >= 0 &&
          squareCol <= 9 &&
          openBoard[row][squareCol] === false
        ) {
          handleSelect(gameBoard, openBoard, row, squareCol)
        }
      }

      for (const squareRow of [row - 1, row + 1]) {
        if (squareRow >= 0 && squareRow <= 9) {
          for (const squareCol of [col - 1, col, col + 1]) {
            if (
              squareCol >= 0 &&
              squareCol <= 9 &&
              openBoard[squareRow][squareCol] === false
            ) {
              handleSelect(gameBoard, openBoard, squareRow, squareCol)
            }
          }
        }
      }
    }

    return false
  }
}

export const calculateOpen = (open: boolean[][]) => {
  let sum = 0

  open.forEach((x) => (sum += x.reduce((x, y) => (y ? x + 1 : x), 0)))

  return sum
}

export const openAll = (openBoard: boolean[][]) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      openBoard[i][j] = true
    }
  }
}
