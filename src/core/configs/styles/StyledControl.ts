import styled from 'styled-components';

const StyledControl = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.controls};
  opacity: 0.6;
  transition: 0.2s;

  &:hover,
  &:active,
  &.selected {
    opacity: 1;
    border: 1px solid ${(props) => props.theme.text};
  }

  & img {
    width: 25px;
    height: 25px;
  }
`;

export default StyledControl;
