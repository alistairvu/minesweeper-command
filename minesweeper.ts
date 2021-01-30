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

console.log("\n")
console.log(boardToDisplayStringArr(boardState, openState))
console.log("\n")
console.log("(None of the corners have mines, so start from there)")

const handleGame = () => {
  rl.question(
    "Enter row number then column number (0 - 9), separated by a space: ",
    (value: string) => {
      const [row, col] = value.split(" ").map((x) => parseInt(x.trim()))

      const foundMine = handleSelect(boardState, openState, row, col)

      const openStateStringArr = boardToDisplayStringArr(boardState, openState)
      console.log("\n")
      console.log(openStateStringArr)
      console.log("\n")
      const opened = calculateOpen(openState)

      if (foundMine) {
        rl.close()
      } else if (opened === 90) {
        console.log("YOU WIN!")
        console.log("\n")
        openAll(openState)
        console.log(boardToDisplayStringArr(boardState, openState))
        console.log("\n")
        rl.close()
      } else {
        console.log(`To open: ${90 - opened}`)
        handleGame()
      }
    }
  )
}

handleGame()
