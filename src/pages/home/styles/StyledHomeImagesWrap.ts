import styled from 'styled-components';

const StyledHomeImagesWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  scroll-behavior: smooth;
  margin-bottom: 40px;
  ::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  }
`;

export default StyledHomeImagesWrap;
