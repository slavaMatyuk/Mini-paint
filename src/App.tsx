import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import firebase from 'firebase/compat';
import PrivateRoute from './core/services/auth/PrivateRoute';
import PublicRoute from './core/services/auth/PublicRoute';
import Homepage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Loader from './core/components/Loader';
import { RootState } from './core/services/store';
import { getUserById } from './core/actions/authActions';
import setLoading from './core/actions/setLoading';

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
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} exact />
        <PublicRoute path="/register" component={RegisterPage} exact />
        <PrivateRoute path="/home" component={Homepage} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
