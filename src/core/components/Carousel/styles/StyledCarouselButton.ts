import styled from 'styled-components';

const StyledCarouselButton = styled.button`
  border: none;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : props.theme.text)};
  background-color: ${(props) => (props.color ? props.color : props.theme.primary)};
  width: 24px;
  height: 320px;
  text-align: center;
  font-size: 20px;
  padding: 8px 0;
  margin: 0;
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  opacity: 0;
  position: absolute;
  &:nth-child(2n) {
    top: 0;
    left: 0;
  }
  &:nth-child(2n+1) {
    top: 0;
    right: 0;
  }

  & a {
    text-decoration: none;
    color: ${(props) => props.color || props.theme.text};
  }

  &:hover {
    opacity: 0.4;
    transition: 0.2s;
  }

  &:active {
    color: ${(props) => (props.color ? props.color : props.theme.canvas)};
    background-color: ${(props) => (props.color ? props.color : props.theme.secondary)};
  }
`;

export default StyledCarouselButton;
