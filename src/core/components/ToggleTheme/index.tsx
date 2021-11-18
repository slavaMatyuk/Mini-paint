import React, { useContext } from 'react';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { ThemeContext } from 'styled-components';
import light from '../styles/themes/light';
import StyledToggle from './styles/StyledToggle';

interface Props {
  toggleTheme(): void;
}

const ToggleTheme: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);
  const icon = theme === light ? <HiMoon size={20} /> : <CgSun size={20} />;

  return (
    <StyledToggle onClick={toggleTheme} title={light ? 'Dark' : 'Light'}>
      {icon}
    </StyledToggle>
  );
};

export default ToggleTheme;
