import styled from 'styled-components';

const StyledAltText = styled.h1`
  font-family: 'Indie Flower';
  font-size: 18px;
  margin-top: 6px;
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: pointer;
`;

export default StyledAltText;
