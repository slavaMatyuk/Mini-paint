import styled from 'styled-components';

const TransparentWrapper = styled.div`
  width: 480px;
  height: 400px;
  background-color: transparent;

  & canvas {
    position: absolute;
  }
`;

export default TransparentWrapper;
