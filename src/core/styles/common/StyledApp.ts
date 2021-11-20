import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${(props) => props.style?.backgroundImage || props.theme.bgImage});
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: .7s ease;
  body {
    background-color: ${(props) => props.color || props.theme.bg};
  }
`;

export default StyledApp;
