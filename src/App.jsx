import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import confetti from "canvas-confetti"
import './App.css'

//importing components
import Square from './components/Square'
import { TURNS, WINNER_COMBOS } from './Constants'



function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X)
  //null no hay ganador, false empate
  const [winner, setWinner] = useState(null)



  const resetGame = ()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard)=>{
      return newBoard.every((square)=> square !== null)
  }

  const checkWinner = (boardToCheck)=>{

    //check every posibility
      for(const combo of WINNER_COMBOS){
        const [a,b,c] = combo;
        console.log("Combo: " + combo)
        if(
          boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[b] === boardToCheck[c] 
        ){
          return boardToCheck[a] //winner x u o
        }
        
      }
      return null;
  }
  const updateBoard = (index)=>{
    //actualizar tablero
    if(board[index] || winner) {return } 
    else{
      let newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard)
      const newWinner = checkWinner(newBoard)
      if(newWinner){
        console.log("The winner is : " + newWinner)
        confetti()
        setWinner(newWinner)
      }else if(checkEndGame(newBoard)){
        setWinner(false)
      }


    //cambiar turno
    const newTurn =  turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

   

    }
    
    
  
    }
  
  //console.log(board)


  return ( 
    <main className="board" >
        <h1>TIC TAC TOE</h1>
        <button onClick={resetGame}>Reset Juego</button>
        <section className="game">
          {
            board.map((_, index) => {
              return (
               <Square  key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
               </Square>
              )
            })
          }

        </section>
        <section className='turn'>

          <Square isSelected={turn==TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn==TURNS.O}>{TURNS.O}</Square>
        </section>


        {
          winner!==null && (
            <section className='winner'>
                <div className='text'>
                  <h2>
                    {
                      winner===false
                      ? "Empate"
                      : "Ha ganado: " + winner
                    }
                  </h2>
                  <header className='win'>
                    {winner && <Square>{winner}</Square>}
                  </header>
                  <footer>
                    <button onClick={resetGame}>Empezar de Nuevo</button>
                  </footer>
                </div>
            </section>
          )
        }


        {
          (
            <footer>
              <h5>Developed by: @eldaniga </h5>
            </footer>
          )
        }
    </main>
    
  
  )
}

export default App;


