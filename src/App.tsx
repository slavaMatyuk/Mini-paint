import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { setAuthAction } from './core/actions/authActions';
import Routes from './core/components/auth/Routes';
import Header from './core/components/Header';
import StyledApp from './core/components/styles/common/StyledApp';
import StyledContainer from './core/components/styles/common/StyledContainer';
import themes from './core/components/styles/themes';
import { auth } from './core/configs/firebase';
import soundsConst from './core/constants/soundConst';
import playSound from './core/helpers/playSound';
import useLocalStorageState from './core/services/utils/useLocalStorageState';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { light, dark } = themes;
  const [theme, setTheme] = useLocalStorageState<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
    playSound(theme === light ? soundsConst.NIGHT : soundsConst.DAY);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email && user.uid) {
        dispatch(setAuthAction(user.email, user.uid));
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Header toggleTheme={toggleTheme} />
        <ToastContainer autoClose={3000} />
        <StyledContainer>
          <Routes />
        </StyledContainer>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
