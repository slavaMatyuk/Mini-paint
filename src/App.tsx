import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { setAuthAction } from './core/actions/authActions';
import Header from './core/components/Header';
import StyledApp from './core/components/styles/StyledApp';
import StyledContainer from './core/components/styles/StyledContainer';
import { auth } from './core/configs/firebase';
import RoutesConst from './core/helpers/constants/routesConst';
import { AppState } from './core/interfaces';
import EditorPage from './pages/editor';
import Homepage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegisterPage from './pages/register';

const App: React.FC = () => {
  const authenticated = useSelector((state: AppState) => state.auth.authenticated);
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
        {authenticated ? (
          <Switch>
            <Route exact path={RoutesConst.HOME}>
              <Homepage />
            </Route>
            <Route exact path={RoutesConst.EDITOR}>
              <EditorPage />
            </Route>
            <Route exact path={RoutesConst.PROFILE}>
              <ProfilePage />
            </Route>
          </Switch>
        ) : (
          <Redirect to={RoutesConst.LOGIN} />
        )}
        {(!authenticated) ? (
          <Switch>
            <Route exact path={RoutesConst.REGISTER}>
              <RegisterPage />
            </Route>
            <Route exact path={RoutesConst.LOGIN}>
              <LoginPage />
            </Route>
            <Route path={RoutesConst.ANY}>
              <Redirect to={RoutesConst.LOGIN} />
            </Route>
          </Switch>
        ) : (
          <Redirect to={RoutesConst.HOME} />
        )}
      </StyledContainer>
    </StyledApp>
  );
};

export default App;
