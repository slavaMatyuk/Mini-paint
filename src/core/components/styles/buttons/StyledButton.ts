import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : props.theme.text)};
  background-color: ${(props) => (props.color ? props.color : props.theme.primary)};
  display: block;
  width: 125px;
  text-align: center;
  font-size: 14px;
  padding: 8px 16px;
  margin: 15px 10px;
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
`;

export default StyledButton;
