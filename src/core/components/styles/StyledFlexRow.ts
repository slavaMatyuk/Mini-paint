import styled from 'styled-components';

const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-self: normal;
  & label {
    font-family: 'Indie Flower';
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.color || props.theme.text};
  }
  & input {
    color: ${(props) => props.color || props.theme.text};
  }
`;

export default StyledFlexRow;
