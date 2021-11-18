import styled from 'styled-components';

const StyledHeaderFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-self: normal;
  & button {
    background-color: ${(props) => props.color || props.theme.secondary};
    border: 1px solid transparent;
    &:hover {
      background-color: ${(props) => props.color || props.theme.primary};
      border: 1px solid ${(props) => props.color || props.theme.secondary};
    }
  }
`;

export default StyledHeaderFlexRow;
