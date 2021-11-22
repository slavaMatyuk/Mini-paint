import styled from 'styled-components';

const StyledLiElement = styled.li`
  padding: 0.25rem;
  opacity: 0.7;
  &.active,
  &:hover {
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
    cursor: pointer;
    font-weight: 700;
    opacity: 1;
  }
`;

export default StyledLiElement;
