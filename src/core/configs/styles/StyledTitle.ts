import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '42px'};
`;

export default StyledTitle;
