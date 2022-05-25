import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useState } from 'react';
import { DogInfoCard, DogsWrapper } from './dogs';
import { useEffect } from 'react';
import { CardsWrapper } from './cards';
import { getDogsByBreed, setFilters } from '../redux/actions/dogActions';


export const Dropdown = styled(Select)`
  font-size: 12px;
  width: calc(60vw - 10px);
  margin: 0 auto;
  text-align:left;
`;

const Wrapper = styled(CardsWrapper)`
  width: 60vw;
  margin: 0 auto;
`;

/**
 * filters.map((breed) => ({
    value: breed,
    label: breeds[breed].name
  }))
 */
export const CustomizeGameInputs = (props) => {
  const { breeds } = useSelector((state) => state.breedState)
  const { dogsByBreed, randomDogs, loading, filters } = useSelector((state) => state.dogState)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentDogs, setCurrentDogs] = useState([]);
  const dispatch = useDispatch();

  const select = (options) => {
    console.log(options)
    dispatch(
      setFilters(
        options.reduce((accumulator, option) => {
          return { ...accumulator, [option.value]: option.value };
        }, {})))
    setSelectedOptions(options)
  }

  useEffect(() => {
    console.log("filters in persist: ", filters)
    console.log("dogsByBreed", dogsByBreed)
    console.log("randomDogs", randomDogs)
    console.log("currentDogs (one behind)", currentDogs)
    const nrBreeds = Object.keys(dogsByBreed).length
    if (nrBreeds > 0) {
      const allFiltered = Object.values(dogsByBreed).flat();
      const shuffled = allFiltered.sort(() => Math.random() - 0.5)
      setCurrentDogs(shuffled.slice(0,10))
      
    } else setCurrentDogs(randomDogs)
  }, [dogsByBreed, randomDogs])

  return (
    <>
      <Dropdown
        defaultValue={selectedOptions}
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
      <Wrapper>
        {currentDogs.map((dog, index) => (
          <DogInfoCard
            dog={dog}
            key={dog.image}
          />
        ))}
      </Wrapper>
      <br />
      <button onClick={() => {
        props.onNewGame(currentDogs)
      }}>New Game</button>
    </>
  )
}
