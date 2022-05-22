import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsWrapper, MemoryCard } from '../components/cards';
import { getRandomDogs } from '../redux/actions/dogActions';


const Game = () => {
    const { memoryDogs } = useSelector((state) => state.dogState);
    const dispatch = useDispatch()
  
    useEffect(() => {
        if(memoryDogs.length < 1) dispatch(getRandomDogs(10))
    }, [])
  

    return (

        <CardsWrapper>
        {memoryDogs.map((memoryDog) => (
          <MemoryCard img={memoryDog}/>
        ))}
      </CardsWrapper>
    )
}

export default Game;