import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useState } from 'react';

  
export const Heading = styled.h1`
  font-size: 30px;
`;

const HeaderWrapper = styled.header`
  padding: 30px;
`;

export const Dropdown = styled(Select)`
  font-size: 12px;
  max-width: 75vw;
  margin-left:auto;
  margin-right: auto;
  text-align:left;

`;



export const Header = () => {
  const { breeds } = useSelector((state) => state.breedState)
  const [selectedOptions, setSelectedOptions] = useState(null);

  const select = (options) => {
    console.log(options)
    setSelectedOptions(options)
  }

    return (
      <HeaderWrapper>
        <Heading>Luisa's Dog Challenge Memory</Heading>
        <Dropdown 
          defaultValue={selectedOptions}
          onChange={(options) => {
            select(options)
          }}
          options={breeds.map(breed => ({
            value: breed.path, 
            label: breed.name
          }))}
          isMulti
        />
      </HeaderWrapper>
    )
}   
