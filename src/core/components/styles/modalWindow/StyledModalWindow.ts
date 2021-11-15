import styled from 'styled-components';

const StyledModalWindow = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  max-width: 200px;
  background: #bbbbbb;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 2px 2px #bbbbbb;

  p {
    color: #ffffff;
    margin-top: 15px;
  }
`;

export default StyledModalWindow;
