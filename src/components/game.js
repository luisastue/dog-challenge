import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsWrapper, MemoryCard } from './cards';
import { DogInfoCard, DogsWrapper } from './dogs';
import { endGame, removeDogPair } from '../redux/actions/gameActions';
import styled from 'styled-components';
import { Button, YellowButton } from './buttons';

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
  `;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48vw;
`


const Game = (props) => {
  const { memoryDogs, revealedDogs } = useSelector((state) => state.gameState);
  const dispatch = useDispatch()
  const [firstRevealed, setFirstRevealed] = useState(null)
  const [secondRevealed, setSecondRevealed] = useState(null)
  const dogRefs = useRef([])

  useEffect(() => {
    if (secondRevealed !== null) {
      hideOrRemoveCards(secondRevealed)
    }
  }, [secondRevealed])

  const hideOrRemoveCards = async (index) => {
    setTimeout(() => {
      if (firstRevealed === index) dispatch(removeDogPair(index))
      dogRefs.current.forEach((actions) => {
        if (actions) actions.hide()
      })
      setFirstRevealed(null)
      setSecondRevealed(null)
    }, 1500);
  }

  const handleReveal = (index) => {
    if (firstRevealed === null) setFirstRevealed(index)
    else if (secondRevealed === null) {
      setSecondRevealed(index)
    }
  }

  const gameIsOver = () => {
    return memoryDogs.length === revealedDogs.length * 2
  }

  return (
    <>
      <GameContainer>
        {gameIsOver() ?
          <ButtonContainer>
            <Button onClick={() => dispatch(endGame())}>New Game</Button>
          </ButtonContainer>
          :
          <CardsWrapper>
            {memoryDogs.map((dog, index) => {
              return (
                <MemoryCard
                  key={index}
                  img={dog.image}
                  id={dog.id}
                  revealAllowed={secondRevealed === null}
                  onReveal={handleReveal}
                  isShown={dog.isInGame}
                  ref={(el) => dogRefs.current.push(el)}
                />
              )
            })}
          </CardsWrapper>
        }
        <DogsWrapper>
          {revealedDogs.map((dog, index) => (
            <>
              <DogInfoCard
                dog={dog}
                key={index + 20}
              />
            </>
          )
          )}

        </DogsWrapper>
      </GameContainer>
      {!gameIsOver() ?
      <YellowButton onClick={() => dispatch(endGame())}>Give up</YellowButton>
      : null }
      <br />
      <br />
    </>
  )

}

export default Game;