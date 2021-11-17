import styled from 'styled-components';

const StyledLoginTitle = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '24px'};
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: default;
  text-shadow: 0 2px 2px black;
`;

export default StyledLoginTitle;
