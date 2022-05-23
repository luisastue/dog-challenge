import './App.css';
import Game from './screens/game';
import { Header } from './components/header';
import { getAllBreeds } from './redux/actions/breedActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRandomDogs } from './redux/actions/dogActions';

const App = () => {
  const { memoryDogs } = useSelector((state) => state.dogState);
  const { breeds } = useSelector((state) => state.breedState);
  const dispatch = useDispatch()

  useEffect(() => {
      if(memoryDogs.length < 1) dispatch(getRandomDogs(10))
      dispatch(getAllBreeds())
    }, [])

  useEffect(() => {
    console.log("breeds", breeds)
  }, [breeds])

  return (
    <div className="App">
      <Header/>
      <Game dogs={memoryDogs} />
    </div>
  );
}

export default App;