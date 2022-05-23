import { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';


export const Heading = styled.h1`
  font-size: 30px;
`;

const HeaderWrapper = styled.header`
  padding: 30px;
`;

export const Input = styled.h1`
  font-size: 20px;
  padding: 30px;
`;

export const Header = () => {
    return (
      <HeaderWrapper>
        <Heading>Luisa's Dog Challenge Memory</Heading>
        <input></input>
      </HeaderWrapper>
    )
}   

//https://medium.com/@matt.readout/adding-css-animations-with-styled-components-6c191c23b6ba
//https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
//https://javascript.plainenglish.io/how-to-animate-with-css-keyframes-in-react-2d76775b4d74
//https://www.w3schools.com/howto/howto_css_flip_card.asp