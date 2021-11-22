import styled from 'styled-components';

const StyledUlElement = styled.ul`
  position: absolute;
  z-index: 5;
  left: 75px;
  width: 230px;
  border-top-width: 0;
  border-radius: 5px;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.scrollCover};
  backdrop-filter: blur(7px);
  ::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  }
`;

export default StyledUlElement;
