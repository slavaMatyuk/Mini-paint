import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 5px;
  border: none;
  color: ${(props) => (props.color ? props.color : props.theme.text)};
  background-color: ${(props) => (props.color ? props.color : props.theme.primary)};
  display: block;
  width: 140px;
  text-align: center;
  font-size: 14px;
  padding: 8px 16px;
  margin: 15px auto;
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;

  &:hover {
    background-color: ${(props) => (props.color ? props.color : props.theme.secondary)};
  }
`;

export default StyledButton;
