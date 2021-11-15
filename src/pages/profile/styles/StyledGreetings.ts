import styled from 'styled-components';

const StyledGreetings = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '28px'};
  margin-bottom: 10px;
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: default;
`;

export default StyledGreetings;
