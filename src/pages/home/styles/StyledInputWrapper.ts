import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  align-self: normal;
  & label {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.color || props.theme.text};
  }
  & input {
    font-family: 'Indie Flower', sans-serif;
    margin-top: 15px;
    margin-left: 10px;
    background-color: transparent;
    border-radius: 4px;
    height: 35px;
    width: 230px;
    padding: 0 15px;
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.color || props.theme.text};
  }
`;

export default StyledInputWrapper;