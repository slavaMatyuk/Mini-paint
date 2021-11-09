import styled from 'styled-components';

const TransparentWrapper = styled.div`
  width: 600px;
  height: 400px;
  background-color: transparent;

  & canvas {
    position: absolute;
  }
`;

export default TransparentWrapper;
