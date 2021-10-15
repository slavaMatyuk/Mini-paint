import styled from 'styled-components';

const StyledControl = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.controls};
  opacity: 0.75;
  transition: 0.2s;

  &:hover,
  &:active {
    opacity: 1;
  }

  & img {
    width: 25px;
    height: 25px;
  }
`;

export default StyledControl;
