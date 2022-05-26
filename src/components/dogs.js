import styled from 'styled-components';
import { CardGridElement, Front, Image } from './cards';


export const DogsWrapper = styled.div`
  width: 24vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: auto;
  height: fit-content;
`;

const DogInfo = styled.div`
  text-align: left;
  width: calc(10vw - 10px);
  word-wrap: break-word;
  font-size: 1.2vw;
  color: white;
  position: absolute;
  padding: 1vw;
  display: none;
`
const DarkBackground = styled(Front)`
    background-color: black;
    &:hover ${DogInfo} {
        transition: 0.2s ease;
        display: inline;
    }
    &:hover ${Image} {
        display: inline;
        opacity: 0.5;
        transition: 0.2s ease;
    }
`
export const DogInfoCard = ({ dog }) => {
    return (
        <CardGridElement>
            <DarkBackground>
                <Image src={dog.image} />
                <DogInfo>{dog.subBreed} {dog.breed}</DogInfo>
            </DarkBackground>
        </CardGridElement >
    )
}


