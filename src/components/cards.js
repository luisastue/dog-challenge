import styled from 'styled-components';
import paw from '../logo512.png'

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Card = styled.div`
background-color: #f0f0f0;
height: calc(20vw - 20px);
width: calc(20vw - 20px);
padding: 10px;
`;


export const PawCard = (props) => <Card>
  <img src={paw} width='100%' height='100%' alt="paw" />
</Card>