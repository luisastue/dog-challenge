import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsWrapper, MemoryCard } from '../components/cards';
import { getRandomDogs, removeDogPair } from '../redux/actions/dogActions';


const AllCards = ({dogs}) => {
  const dispatch = useDispatch()
  const [firstRevealed, setFirstRevealed] = useState(null)
  const [secondRevealed, setSecondRevealed] = useState(null)
  const dogRefs = useRef([])

  useEffect(() => {
    console.log("first in effect",firstRevealed)
    console.log("second in effect", secondRevealed)
    if(secondRevealed!==null){
      hideOrRemoveCards(secondRevealed)
    }
  }, [secondRevealed])

  const hideOrRemoveCards = async (index) => {
    console.log("first in hide",firstRevealed)
    console.log("second in hide", secondRevealed)
    setTimeout(() => {
      if(firstRevealed === index) dispatch(removeDogPair(index))
      dogRefs.current.forEach((actions) => {
        if(actions) actions.hide()
      })
      setFirstRevealed(null)
      setSecondRevealed(null)
    }, 1500);
  }

  const handleReveal = (index) => {
    console.log("first",firstRevealed)
    console.log("second",secondRevealed)
    if(firstRevealed===null) setFirstRevealed(index)
    else if (secondRevealed===null) {
      setSecondRevealed(index)
    }
  }


  return (
      <CardsWrapper>
      {dogs.map((dog, index) => {
        return (
        <MemoryCard 
          key={index} 
          img={dog.image} 
          id={dog.id} 
          revealAllowed={secondRevealed===null} 
          onReveal={handleReveal} 
          isShown={dog.isInGame}
          ref={(el) => dogRefs.current.push(el)}
          />
        )
      })}
    </CardsWrapper>
  )

}

const Game = () => {
    const { memoryDogs } = useSelector((state) => state.dogState);
    const dispatch = useDispatch()
  
    useEffect(() => {
        if(memoryDogs.length < 1) dispatch(getRandomDogs(10))
      }, [])

    return (
      <AllCards dogs={memoryDogs} />
    )
}

export default Game;