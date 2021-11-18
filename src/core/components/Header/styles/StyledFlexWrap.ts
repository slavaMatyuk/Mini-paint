import styled from 'styled-components';

const StyledFlexWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
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

export default StyledFlexWrap;
