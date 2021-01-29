const readline = require("readline")
import {
  boardToDisplayStringArr,
  generateBoard,
  generateMines,
  generateOpen,
} from "./startUtils"
import { calculateOpen, handleSelect, openAll } from "./gameUtils"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const boardState = generateBoard()
const openState = generateOpen()
generateMines(boardState)

console.log(boardToDisplayStringArr(boardState, openState))

const handleGame = () => {
  rl.question("Enter two values: ", (value: string) => {
    const [row, col] = value.split(" ").map((x) => parseInt(x.trim()))

    const foundMine = handleSelect(boardState, openState, row, col)

    const openStateStringArr = boardToDisplayStringArr(boardState, openState)
    console.log(openStateStringArr)
    const opened = calculateOpen(openState)

    if (foundMine) {
      rl.close()
    } else if (opened === 90) {
      console.log("YOU WIN!")
      openAll(openState)
      console.log(boardToDisplayStringArr(boardState, openState))

      rl.close()
    } else {
      handleGame()
    }
  })
}

handleGame()
