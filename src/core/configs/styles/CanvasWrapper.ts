import styled from 'styled-components';

const CanvasWrapper = styled.div`
  width: 600px;
  height: 400px;
  background-color: ${(props) => props.theme.canvas};

  & canvas {
    position: absolute;
  }
`;

export default CanvasWrapper;
