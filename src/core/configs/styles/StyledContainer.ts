import styled from 'styled-components';

const StyledContainer = styled.div`
  & .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 40px;
  }

  & .main > input {
    margin-top: 30px;
  }
`;

export default StyledContainer;
