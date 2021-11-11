import styled from 'styled-components';

const StyledGalleryTitle = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '20px'};
  margin: 26px 0;
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: default;
`;

export default StyledGalleryTitle;
