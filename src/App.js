import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { CardsWrapper, EmptyCard, PawCard } from './components/cards';
import { getRandomDogs } from './redux/actions/dogActions';

const App = () => {
  const { memoryDogs } = useSelector((state) => state.dogState);
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getRandomDogs(10))
  }, [])

  useEffect(() => {
    console.log(memoryDogs)
}, [memoryDogs])

  return (
    <div className="App">

      <CardsWrapper>
        {memoryDogs.map((memoryDog) => (
          <PawCard img={memoryDog}/>
        ))}
      </CardsWrapper>
    </div>
  );
}

export default App;
