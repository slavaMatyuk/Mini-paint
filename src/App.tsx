import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import RoutesConst from './core/helpers/constants/routesConst';
import EditorPage from './pages/editor';
import Homepage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegisterPage from './pages/register';
import { setCurrentUser } from './core/actions/authActions';
import { auth } from './core/configs/firebase';
import StyledApp from './core/components/styles/StyledApp';
import StyledContainer from './core/components/styles/StyledContainer';
import { RootStateType } from './core/interfaces';
import Header from './core/components/Header';
import Spinner from './core/components/Spinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootStateType) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user1) => {
      if (user1) {
        dispatch(
          setCurrentUser({
            uid: user1.uid,
            email: user1.email,
            photo: user1.photoURL,
          }),
        );
        setIsLoading(false);
      } else {
        dispatch(setCurrentUser(null));
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  return (
    <StyledApp>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <StyledContainer>
          {user ? (
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
          {user === null ? (
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
      )}
    </StyledApp>
  );
};

export default App;
