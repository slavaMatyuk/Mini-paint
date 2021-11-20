import styled from 'styled-components';

const StyledModalWindow = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  max-width: 200px;
  background: #acc9;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 10px 2px #acc9;

  p {
    color: #ffffff;
    margin-top: 15px;
  }
`;

export default StyledModalWindow;
