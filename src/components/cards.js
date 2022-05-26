import { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import paw from '../paw.png'
import { keyframes } from 'styled-components';

const BORDER_RADIUS = '10px'

const flipAnimation = keyframes`
from {
  transform: rotateY(180deg);
  transform-style: preserve-3d;
}
to {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}
`

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 48vw;
`;

export const CardGridElement = styled.div`
  height: calc(12vw - 10px);
  width: calc(12vw - 10px);
  padding: 5px;
  border-radius: ${BORDER_RADIUS};
  perspective: 1000px;
`;

export const Front = styled.div`
  border-radius: ${BORDER_RADIUS};
  animation-name: ${flipAnimation};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  height: 100%;
  width: 100%;
  display: flex;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const Back = styled(Front)`
  background-color: #CFE1E1;
`;

export const Image = styled.img`
  border-radius: ${BORDER_RADIUS};
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
`;


export const MemoryCard = forwardRef(({ img, id, revealAllowed, onReveal, isShown, revealed}, ref) => {
  const [isRevealed, setIsRevealed] = useState(revealed)

  useImperativeHandle(ref, () => ({
    hide() {
      if (isRevealed) setIsRevealed(false)
    }
  }));
  const revealIfAllowed = () => {
    if (revealAllowed && !isRevealed) {
      setIsRevealed(true)
      onReveal(id)
    }
  }

  return (
    <CardGridElement>
      {isShown ?
            isRevealed ?
              <Front>
                <Image src={img} />
              </Front>
              :
              <Back>
                <Image src={paw} onClick={revealIfAllowed} />
              </Back>
          
        : null}
    </CardGridElement >
  )
});

//https://medium.com/@matt.readout/adding-css-animations-with-styled-components-6c191c23b6ba
//https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
//https://javascript.plainenglish.io/how-to-animate-with-css-keyframes-in-react-2d76775b4d74
//https://www.w3schools.com/howto/howto_css_flip_card.asp