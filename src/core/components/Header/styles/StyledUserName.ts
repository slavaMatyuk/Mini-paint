import styled from 'styled-components';

const StyledUserName = styled.h1`
  font-family: 'Indie Flower';
  font-size: ${(props) => props.style?.fontSize || '20px'};
  color: ${(props) => props.color || props.theme.text};
  user-select: auto;
  cursor: default;
  margin-right: 10px;
`;

export default StyledUserName;
