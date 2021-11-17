import styled from 'styled-components';

const StyledProfileImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${(props) => props.theme.canvas};
  position: relative;
  margin-bottom: 40px;
`;

export default StyledProfileImages;
