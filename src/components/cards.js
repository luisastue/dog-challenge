import { useState } from 'react';
import styled from 'styled-components';
import paw from '../logo512.png'

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 75vw;
  margin-left: auto;
  margin-right: auto;
`;

const CardContainer = styled.div`
  height: calc(15vw - 20px);
  width: calc(15vw - 20px);
  margin: 10px;
  background-color: #f0f0f0;
`;

const Card = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
export const MemoryCard = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  
  
  return (
    <CardContainer>
      <Card>
        <Image src={isOpen ? props.img : paw} onClick={() => setIsOpen(!isOpen)}/>
      </Card>
    </CardContainer>
  )
}

export const EmptyCard = (props) => <CardContainer />