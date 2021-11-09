import styled from 'styled-components';

const StyledModalButton = styled.button`
  border-radius: 50%;
  border: 3px solid #ffffff;
  cursor: pointer;
  color: #ffffff;
  background-color: #00cc00;
  display: block;
  width: 80px;
  height: 80px;
  text-align: center;
  font-size: 28px;
  padding: 0;
  margin: 10px;
  transition: background-color 0.2s linear;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

export default StyledModalButton;
