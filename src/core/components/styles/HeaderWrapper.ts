import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.color || props.theme.primary};
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 0 0 5px 30px;
  width: 100%;
  height: 55px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }

  & button {
    background-color: ${(props) => props.color || props.theme.secondary};
    border: 1px solid transparent;
    &:hover {
      background-color: ${(props) => props.color || props.theme.primary};
      border: 1px solid ${(props) => props.color || props.theme.secondary};
    }
  }
`;

export default HeaderWrapper;
