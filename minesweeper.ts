const readline = require("readline")
import {
  boardToDisplayStringArr,
  generateBoard,
  generateMines,
  generateOpen,
} from "./startUtils"
import { calculateOpen, handleSelect } from "./gameUtils"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const boardState = generateBoard()
const openState = generateOpen()
generateMines(boardState)

let foundMine = false
let opened = 0

const handleGame = () => {
  rl.question("Enter two values: ", (value: string) => {
    const [row, col] = value.split(" ").map((x) => parseInt(x.trim()))
    handleSelect(boardState, openState, row, col, foundMine)
    const openStateStringArr = boardToDisplayStringArr(boardState, openState)
    console.log(openStateStringArr)
    opened = calculateOpen(openState)
    if (foundMine) {
      rl.close()
    } else if (opened === 90) {
      console.log("YOU WIN!")
      rl.close()
    } else {
      handleGame()
    }
  })
}

handleGame()
