import styled from 'styled-components';

const CanvasWrapper = styled.div`
  width: 600px;
  height: 400px;
  background-color: ${(props) => props.theme.canvas};
  border-radius: 2px;
  box-shadow: 0 0 10px 0 ${(props) => props.theme.text};
  cursor: crosshair;

  & canvas {
    position: absolute;
  }
`;

export default CanvasWrapper;
