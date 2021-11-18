import React, { useContext } from 'react';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { ThemeContext } from 'styled-components';
import StyledToggle from './styles/StyledToggle';

interface Props {
  toggleTheme(): void;
}

const ToggleTheme: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);
  const icon = theme.title === 'light' ? <HiMoon size={20} /> : <CgSun size={20} />;

  return (
    <StyledToggle onClick={toggleTheme} title={theme.title === 'light' ? 'Night' : 'Day'}>
      {icon}
    </StyledToggle>
  );
};

export default ToggleTheme;
