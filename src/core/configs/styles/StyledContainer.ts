import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;

  & a {
    text-decoration: none;
    color: ${(props) => props.color || props.theme.text};
  }
`;

export default StyledContainer;
