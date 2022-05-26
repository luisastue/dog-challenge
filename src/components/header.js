import styled from 'styled-components';
import { H1 } from './texts';

  
const HeaderWrapper = styled.header`
  padding-top: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const Header = () => {

    return (
      <HeaderWrapper>
        <H1>Luisa's Dog Challenge Memory</H1>
      </HeaderWrapper>
    )
}   
