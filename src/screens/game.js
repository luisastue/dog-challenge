import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsWrapper, MemoryCard } from '../components/cards';
import { DogInfoCard, DogsWrapper } from '../components/dogs';
import { removeDogPair } from '../redux/actions/gameActions';
import styled from 'styled-components';




const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
  `;


const Game = (props) => {
  const { memoryDogs, revealedDogs } = useSelector((state) => state.gameState);
  const dispatch = useDispatch()
  const [firstRevealed, setFirstRevealed] = useState(null)
  const [secondRevealed, setSecondRevealed] = useState(null)
  const dogRefs = useRef([])

  useEffect(() => {
    if(secondRevealed!==null){
      hideOrRemoveCards(secondRevealed)
    }
  }, [secondRevealed])

  const hideOrRemoveCards = async (index) => {
    setTimeout(() => {
      if(firstRevealed === index) dispatch(removeDogPair(index))
      dogRefs.current.forEach((actions) => {
        if(actions) actions.hide()
      })
      setFirstRevealed(null)
      setSecondRevealed(null)
      if(revealedDogs.length === memoryDogs.length / 2) props.onEnd()
    }, 1500);
  }

  const handleReveal = (index) => {
    if(firstRevealed===null) setFirstRevealed(index)
    else if (secondRevealed===null) {
      setSecondRevealed(index)
    }
  }

  return (
    <GameContainer>
      <CardsWrapper>
      {memoryDogs.map((dog, index) => {
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
    <DogsWrapper>
    {revealedDogs.map((dog, index) => (
          <>
          <DogInfoCard 
            dog={dog}
            key={index+20} 
            />
          </>
        )
      )}

    </DogsWrapper>
    </GameContainer>
  )

}

export default Game;