import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import EditorPage from '../../../pages/editor';
import Homepage from '../../../pages/home';
import LoginPage from '../../../pages/login';
import ProfilePage from '../../../pages/profile';
import RegisterPage from '../../../pages/register';
import { setCurrentUser } from '../../actions/authActions';
import { auth } from '../../configs/firebase';
import StyledApp from '../../configs/styles/StyledApp';
import StyledContainer from '../../configs/styles/StyledContainer';
import routesConst from '../../helpers/constants/routesConst';
import { RootState } from '../../reducers';
import Header from '../Header';
import Spinner from '../Spinner';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            photo: user.photoURL,
          })
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
              <Route exact path={routesConst.HOME}>
                <Homepage />
              </Route>
              <Route exact path={routesConst.EDITOR}>
                <EditorPage />
              </Route>
              <Route exact path={routesConst.PROFILE}>
                <ProfilePage />
              </Route>
            </Switch>
          ) : (
            <Redirect to={routesConst.LOGIN} />
          )}
          {user === null ? (
            <Switch>
              <Route exact path={routesConst.REGISTER}>
                <RegisterPage />
              </Route>
              <Route exact path={routesConst.LOGIN}>
                <LoginPage />
              </Route>
              <Route path={routesConst.ANY}>
                <Redirect to={routesConst.LOGIN} />
              </Route>
            </Switch>
          ) : (
            <Redirect to={routesConst.HOME} />
          )}
        </StyledContainer>
      )}
    </StyledApp>
  );
};

export default App;
