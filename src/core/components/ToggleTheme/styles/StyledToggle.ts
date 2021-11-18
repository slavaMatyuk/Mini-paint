import styled from 'styled-components';

const StyledToggle = styled.button`
    cursor: pointer;
    height: 22px;
    width: 22px;   
    border-radius: 50%;
    border: none;
    margin-left: 30px;
    color: ${(props) => props.theme.text};
    align-self: center;
    &:focus {
        outline: none;
    }
    transition: all .4s ease;
    background-color: ${(props) => props.color || props.theme.primary};
    border: 1px solid transparent;
    &:hover {
      background-color: ${(props) => props.color || props.theme.secondary};
    }
`;

export default StyledToggle;
