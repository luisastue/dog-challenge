import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useState } from 'react';
import { DogInfoCard } from './dogs';
import { useEffect } from 'react';
import { CardsWrapper } from './cards';
import { getRandomDogs, setFiltersAndGetDogs } from '../redux/actions/dogActions';
import { startGame } from '../redux/actions/gameActions';
import { Button, YellowButton } from './buttons';
import { H2 } from './texts';


export const Dropdown = styled(Select)`
  font-size: 12px;
  width: calc(60vw - 10px);
  margin: 0 auto;
  text-align:left;
`;

const Wrapper = styled(CardsWrapper)`
  width: 60vw;
  margin: 0 auto;
  justify-content: center;
`;
export const CustomizeGameInputs = (props) => {
  const { breeds } = useSelector((state) => state.breedState)
  const { dogsByBreed, randomDogs, filters } = useSelector((state) => state.dogState)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentDogs, setCurrentDogs] = useState([]);
  const dispatch = useDispatch();

  const filtersAreSet = () => selectedOptions.length > 0

  useEffect(() => {
    if(Object.keys(dogsByBreed).length === 10){
      const allFiltered = Object.values(dogsByBreed).flat();
      const shuffled = allFiltered.sort(() => Math.random() - 0.5)
      setCurrentDogs(shuffled)
    }
    //attach random dogs if there are not enough dogs of this breed
    dispatch(getRandomDogs(10))
  }, [dogsByBreed])

  useEffect(() => {
    if (filtersAreSet()) {
      const allFiltered = Object.values(dogsByBreed).flat();
      const shuffled = allFiltered.sort(() => Math.random() - 0.5)
      setCurrentDogs(shuffled.concat(randomDogs).slice(0, 10))
    }
    else  setCurrentDogs(randomDogs)
  }, [randomDogs])

  useEffect(() => {
    setSelectedOptions(filters.map((breed) => {
      return {
        value: breed,
        label: breeds[breed].name
      }
    }))
  }, [filters])

  const fetchNewImages = () => {
    if(Object.keys(dogsByBreed).length > 0) select(selectedOptions)
    else dispatch(getRandomDogs(10))
  }

  const select = (options) => {
    dispatch(
      setFiltersAndGetDogs(
        options.reduce((accumulator, option) => {
          return { ...accumulator, [option.value]: option.value };
        }, {})))
  }

  return (
    <>
      <H2>Ready to play memory?<br/>Customize the dog images you want to play with by adjusting the filters</H2>
      <Wrapper>
        {currentDogs.map((dog, index) => (
          <div 
            onClick={() => {select([...selectedOptions, {value: dog.path, label: dog.name}])}} 
            style={dog.isRandom && filtersAreSet() ? {opacity: 0.3} : null}>
          <DogInfoCard
            dog={dog}
            key={dog.image}
          />
          </div>
        ))}
      </Wrapper>
      <br />
      <Dropdown
        value={selectedOptions}
        onChange={(options) => {
          select(options)
        }}
        options={Object.values(breeds).map(breed => ({
          value: breed.path,
          label: breed.name
        }))}
        isMulti
      />
      <br />
      <YellowButton onClick={() => fetchNewImages()}>Fetch new Images</YellowButton>
      <Button onClick={() => {
        dispatch(startGame(currentDogs))
      }}>Start Game</Button>
    </>
  )
}
