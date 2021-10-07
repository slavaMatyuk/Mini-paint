import firebase from 'firebase/compat';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import getUserById from './core/actions/getUserById';
import setLoading from './core/actions/setLoading';
import Loader from './core/components/Loader';
import routesConst from './core/helpers/constants/routesConst';
import history from './core/helpers/history';
import PrivateRoute from './core/services/auth/PrivateRoute';
import PublicRoute from './core/services/auth/PublicRoute';
import { RootState } from './core/services/store';
import EditorPage from './pages/editor';
import Homepage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegisterPage from './pages/register';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path={routesConst.LOGIN} component={LoginPage} exact />
        <PublicRoute path={routesConst.REGISTER} component={RegisterPage} exact />
        <PrivateRoute path={routesConst.HOME} component={Homepage} exact />
        <PrivateRoute path={routesConst.PROFILE} component={ProfilePage} exact />
        <PrivateRoute path={routesConst.EDITOR} component={EditorPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
