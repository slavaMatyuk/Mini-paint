import styled from 'styled-components';

const StyledRegTitle = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '24px'};
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: default;
  text-shadow: 0 2px 2px ${(props) => props.color || props.theme.spinner};
`;

export default StyledRegTitle;
