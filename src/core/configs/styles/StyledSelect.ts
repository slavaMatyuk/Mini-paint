import styled from 'styled-components';

const StyledSelect = styled.select`
  background: transparent;
  color: ${(props) => props.color || props.theme.text};
  padding: 2px 5px;
  font-size: 14px;
  border: none;
  outline: none;
  margin: 0 130px 0 10px;
  cursor: pointer;
  width: 55px;
`;

export default StyledSelect;
