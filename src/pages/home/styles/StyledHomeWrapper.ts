import styled from 'styled-components';

const StyledHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0;

  & a {
    text-decoration: none;
    color: ${(props) => props.color || props.theme.text};
  }
`;

export default StyledHomeWrapper;
