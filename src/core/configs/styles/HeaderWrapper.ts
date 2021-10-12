import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.color || props.theme.primary};
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 0 0 5px 30px;
  width: 100%;
  height: 50px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export default HeaderWrapper;
