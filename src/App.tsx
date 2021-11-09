import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthAction } from './core/actions/authActions';
import Routes from './core/components/auth/Routes';
import Header from './core/components/Header';
import StyledApp from './core/components/styles/common/StyledApp';
import StyledContainer from './core/components/styles/common/StyledContainer';
import { auth } from './core/configs/firebase';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email && user.uid) {
        dispatch(setAuthAction(user.email, user.uid));
      }
    });
  }, [dispatch]);

  return (
    <StyledApp>
      <Header />
      <StyledContainer>
        <Routes />
      </StyledContainer>
    </StyledApp>
  );
};

export default App;
