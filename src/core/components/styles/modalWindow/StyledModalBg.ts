import styled from 'styled-components';

const StyledModalBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;  
  z-index: 1;
`;

export default StyledModalBg;
