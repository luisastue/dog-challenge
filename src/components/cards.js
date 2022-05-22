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

export const CardContainer = styled.div`
  height: calc(15vw - 20px);
  width: calc(15vw - 20px);
  margin: 10px;
  background-color: #dadada;
`;

export const Card = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`

export const PawCard = (props) => (
  <CardContainer>
    <Card>
      <Image src={props.img ? props.img : paw} />
    </Card>
  </CardContainer>
)

export const EmptyCard = (props) => <CardContainer />