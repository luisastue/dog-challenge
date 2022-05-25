import './App.css';
import Game from './screens/game';
import { Header } from './components/header';
import { getAllBreeds } from './redux/actions/breedActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRandomDogs } from './redux/actions/dogActions';
import styled from 'styled-components';
import { CustomizeGameInputs } from './components/customizeGameInputs';
import { endGame, startGame } from './redux/actions/gameActions';


const Container = styled.div`
  max-width: 75vw;
  margin-left: auto;
  margin-right: auto;
  `;


const App = () => {
  const { memoryDogs, revealedDogs, gameIsRunning } = useSelector((state) => state.gameState);
  const { breeds } = useSelector((state) => state.breedState);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(memoryDogs)
    if (memoryDogs.length < 1) dispatch(getRandomDogs(10))
    dispatch(getAllBreeds())
  }, [])

  useEffect(() => {
    console.log("breeds", breeds)
  }, [breeds])

  return (
    <div className="App">
      <Container>
        <Header />
        {gameIsRunning 
        ? <Game onEnd={() => dispatch(endGame())}/>
        : <CustomizeGameInputs onNewGame={(dogs) => dispatch(startGame(dogs))}/>
        }
      </Container>
    </div>
  );
}

export default App;