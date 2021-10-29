import styled from 'styled-components';

const StyledDeleteBtn = styled.button`
  border-radius: 50%;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : props.theme.text)};
  background-color: ${(props) => (props.color ? props.color : props.theme.primary)};
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 25px;
  padding: 0 5px;
  opacity: 0.2;
  margin: 3px 3px;
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
    opacity: 1;
  }
`;

export default StyledDeleteBtn;
