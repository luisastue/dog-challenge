import styled from 'styled-components';



export const Button = styled.button`
    background-color: white;
    text-transform: uppercase;
	font-weight: 500;
    color: #487b82;
    border: 2px solid #CFE1E1;
    padding: 10px 15px;
    display: inline-block;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: inset 0 0 0 0 #CFE1E1;
    -webkit-transition: ease-out 0.4s;
    -moz-transition: ease-out 0.4s;
    transition: ease-out 0.4s;
	
	&:hover {
        box-shadow: inset 300px 0 0 0 #CFE1E1;
        border: 2px solid #487b82;

      }
`;


export const PurpleButton = styled(Button)`
    color: #6d4882;
    border: 2px solid #d5cfe1;
    box-shadow: inset 0 0 0 0 #d5cfe1;
	&:hover {
        box-shadow: inset 300px 0 0 0 #d5cfe1;
        border: 2px solid #6d4882;
      }
`;


export const YellowButton = styled(Button)`
    color: #d6a92d;
    border: 2px solid #ebe5be;
    box-shadow: inset 0 0 0 0 #ebe5be;
	&:hover {
        box-shadow: inset 300px 0 0 0 #ebe5be;
        border: 2px solid #d6a92d;
      }
`;
