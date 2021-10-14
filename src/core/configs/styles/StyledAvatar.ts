import styled from 'styled-components';

const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 3px 2px #545454;
  background-color: ${(props) => props.color || props.theme.bg};
  color: ${(props) => props.color || props.theme.text};
  font-size: 28px;
  font-family: sans-serif;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledAvatar;
