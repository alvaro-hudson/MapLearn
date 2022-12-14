import React, { useEffect, useState } from "react"
// import components
import WorldMap from "./WorldMap"
import LeaderBoard from "./LeaderBoard"
import ScoreSumary from './ScoreSummary'
//import functions


function Play() {
  const [allCountries, setAllCountries] = useState([])
  const [clickedCountry, setClickedCountry] = useState(null) // contains country clicked by user
  const [randomCountry, setRandomCountry] = useState(null) // contains random country for the round
  const [answer, setAnswer] = useState('')  // variable that hold if the answer was right or wrong to print
  const [turn, setTurn] = useState(1) // holds current turn
  const [score,setScore] = useState(0) // holds score of game
  const [reset, setReset] = useState(false) 
  const [showLeaderBoard, setyShowLeaderBoard] = useState(false)
  const [expiredCountriesArr, setExpiredCountriesArr] = useState([])


  // VARIABLES
  const arrayOfCountries = []

  // colors:
  const green = '#aeeb2bcf'
  const red = 'rgb(216, 48, 82)'
  const grey = 'rgba(255, 255, 255, 0.512)'
  const countryGreen = 'rgba(113, 172, 102, 0.418)'


  // on mounting & when reset is modified
  useEffect(() => {
    const countriesDOM = Array.from(document.querySelectorAll('path'))
    // console.log(`Effect - Mx: `, Array.from(document.querySelectorAll('path#MX'))) // prints mexico for reference 
    const rndInt = Math.floor(Math.random() * `${countriesDOM.length}`) //random number from 0 to array.length
    const rndmCntry = countriesDOM[rndInt]

    // pseudo:
    // - Create the array of all the countries
    // - remove already excluded countries (starts with not removing anything since excluding array is empty)
    // - Select a random country from the array
    // - push random country to excluded countries array
    // set the selected random country to its useState variable
    // - play game
    // - on reset start from top
    // 
  
  
    // * testing funcs

    // end testing
    
    


    setRandomCountry(rndmCntry)
  }, [reset])

  //  ^ FUNCTIONS


  // ~ countryClicked
  //this function will run when a country is clicked in WorldMap
  const countryClicked = (e) => {
    const id = e.target.id
    const clicked = Array.from(document.querySelectorAll(`path#${id}`))

    const clickedCountry = clicked[0]
    setClickedCountry(clickedCountry)
    randomCountry.style.fill = green
    if (id === randomCountry.id){
      setAnswer('CORRECT!')
      setScore(prevScore => {
        return prevScore + 1
      })
    }else {
      setAnswer('WRONG!')
      clickedCountry.style.fill = red
    }
  }
  
  // ~nextGuess
  const nextGuess = e => {
    randomCountry.style.fill = ''
    clickedCountry.style.fill = ''
    setRandomCountry(null)
    setClickedCountry(null)
    setReset(!reset)
    setTurn(previousTurn => {
      return previousTurn + 1
    })
  }

  // ~unselect 
  const unselect = e => {
    e.stopPropagation()
  }

  // ~resetGame 
  const resetGame = e => {
    setClickedCountry(null) // contains country clicked by user
    setRandomCountry(null) // contains random country for the round
    setAnswer('')  // variable that hold if the answer was right or wrong to print
    setTurn(1) // holds current turn
    setScore(0) // holds score of game
    setyShowLeaderBoard(false)
    setReset(!reset)
    randomCountry.style.fill = countryGreen
    if(clickedCountry){clickedCountry.style.fill = countryGreen}
  }


  // ! RETURN

  return (
    <>
      <WorldMap countryClicked={countryClicked} />

      <div className='play-content'>
      {randomCountry && <h2 className="play-country-title">{randomCountry.dataset.name}</h2>}
        <p className="turn">Turn: {turn === 11 ? 10 : turn}/10</p>
        {/* todo: score appears after turn 10 finishes */}
      
        
        {/* <p className="score">Score: {turn}pts</p> */}

      {showLeaderBoard && <LeaderBoard />}

      </div>

      {turn >= 11 &&
      <>
        <div className="unselect">
          <div className="unselect-top"></div>
          <div className="unselect-gameover-bottom unselect-bottom" onClick={unselect} ></div>
        </div>
        <ScoreSumary score={score} resetGame={resetGame} />
      </>
      }

      {clickedCountry &&
      <>
        <div className="unselect">
          <div className="unselect-top"></div>
          <div className="unselect-bottom" onClick={unselect} ></div>
        </div>

      <div className='refresh-choice'>
      {<p className="answer">Your answer was: {answer}</p>}
        <button className="btn-next" onClick={nextGuess}>Next</button>   
        </div>
      </>
      }
      <button className="reset-game button-38" onClick={resetGame}>Reset</button>

    </>
  )
}

export default Play
