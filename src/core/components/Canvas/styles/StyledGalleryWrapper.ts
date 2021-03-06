import styled from 'styled-components';

const StyledGalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  }
`;

export default StyledGalleryWrapper;
