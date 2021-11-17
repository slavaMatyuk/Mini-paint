import styled from 'styled-components';

const StyledGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${(props) => props.theme.canvas};
`;

export default StyledGallery;
