import Game from './components/game';
import { Header } from './components/header';
import { getAllBreeds } from './redux/actions/breedActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRandomDogs } from './redux/actions/dogActions';
import styled from 'styled-components';
import { CustomizeGameInputs } from './components/customizeGameInputs';


const Container = styled.div`
  max-width: 75vw;
  margin-left: auto;
  margin-right: auto;
  `;


const App = () => {
  const { memoryDogs, gameIsRunning } = useSelector((state) => state.gameState);
  const dispatch = useDispatch()

  useEffect(() => {
    if (memoryDogs.length < 1) dispatch(getRandomDogs(10))
    dispatch(getAllBreeds())
  }, [])

  return (
    <div>
      <Container>
        <Header />
        {gameIsRunning 
        ? <Game/>
        : <CustomizeGameInputs/>
        }
      </Container>
    </div>
  );
}

export default App;