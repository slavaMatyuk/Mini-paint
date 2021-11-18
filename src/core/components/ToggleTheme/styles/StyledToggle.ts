import styled from 'styled-components';

const StyledToggle = styled.button`
    cursor: pointer;
    height: 22px;
    width: 22px;   
    border-radius: 50%;
    border: none;
    margin-left: 25px;
    color: ${(props) => props.theme.text};
    &:focus {
        outline: none;
    }
    transition: all .4s ease;
`;

export default StyledToggle;
