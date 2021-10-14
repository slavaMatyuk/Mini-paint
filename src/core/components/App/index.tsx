import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import RoutesConst from '../../helpers/constants/routesConst';
import EditorPage from '../../../pages/editor';
import Homepage from '../../../pages/home';
import LoginPage from '../../../pages/login';
import ProfilePage from '../../../pages/profile';
import RegisterPage from '../../../pages/register';
import { setCurrentUser } from '../../actions/authActions';
import { auth } from '../../configs/firebase';
import StyledApp from '../../configs/styles/StyledApp';
import StyledContainer from '../../configs/styles/StyledContainer';
import { RootStateType } from '../../interfaces';
import Header from '../Header';
import Spinner from '../Spinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootStateType) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
