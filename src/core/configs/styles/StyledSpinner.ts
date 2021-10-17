import styled from 'styled-components';

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: 40px;
  width: 50px;
  height: 50px;
  margin-top: 70px;

  & #path {
    stroke: ${(props) => props.color || props.theme.spinner};
    stroke-linecap: round;
    stroke-width: 4px;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default StyledSpinner;
