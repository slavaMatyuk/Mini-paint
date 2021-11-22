import styled from 'styled-components';

const StyledSearchButton = styled.button`
  border-radius: 0 5px 5px 0;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  color: ${(props) => (props.color ? props.color : props.theme.text)};
  background-color: ${(props) => (props.color ? props.color : props.theme.primary)};
  display: block;
  width: 36px;
  height: 35px;
  padding: 5px 10px;
  margin: 0;
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;

  & a {
    text-decoration: none;
    color: ${(props) => props.color || props.theme.text};
  }

  &:hover {
    background-color: ${(props) => (props.color ? props.color : props.theme.secondary)};
  }

  &:active {
    background-color: ${(props) => (props.color ? props.color : props.theme.bg)};
  }
`;

export default StyledSearchButton;
