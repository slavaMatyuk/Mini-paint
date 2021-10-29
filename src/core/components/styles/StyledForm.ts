import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  & input {
    margin-top: 15px;
    margin-left: 10px;
    background-color: transparent;
    border-radius: 4px;
    height: 35px;
    width: 230px;
    padding: 0 10px;
    font-size: 14px;
  }
`;

export default StyledForm;
