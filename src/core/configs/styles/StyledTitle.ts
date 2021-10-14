import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '42px'};
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: default;
`;

export default StyledTitle;
