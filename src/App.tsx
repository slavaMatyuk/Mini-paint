import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { setAuthAction } from './core/actions/authActions';
import Routes from './core/components/auth/Routes';
import Header from './core/components/Header';
import StyledApp from './core/components/styles/common/StyledApp';
import StyledContainer from './core/components/styles/common/StyledContainer';
import themes from './core/components/styles/themes';
import { auth } from './core/configs/firebase';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { light, dark } = themes;
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
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
