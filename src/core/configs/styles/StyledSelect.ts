import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 86%;
  height: 30px;
  background: transparent;
  color: ${(props) => props.color || props.theme.text};
  padding: 2px 5px;
  font-size: 14px;
  border: none;
  outline: none;
  margin-left: 10px;
  cursor: pointer;
`;

export default StyledSelect;
