import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useState } from 'react';

  
export const Heading = styled.h1`
  font-size: 30px;
`;

const HeaderWrapper = styled.header`
  padding-top: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const Header = () => {

    return (
      <HeaderWrapper>
        <Heading>Luisa's Dog Challenge Memory</Heading>
      </HeaderWrapper>
    )
}   
