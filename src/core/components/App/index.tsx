import firebase from 'firebase/compat';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import setLoading from '../../actions/setLoading';
import Loader from '../Loader';
import routesConst from '../../helpers/constants/routesConst';
import history from '../../helpers/history';
import { RootState } from '../../reducers';
import PrivateRoute from '../../services/auth/PrivateRoute';
import PublicRoute from '../../services/auth/PublicRoute';
import EditorPage from '../../../pages/editor';
import Homepage from '../../../pages/home';
import LoginPage from '../../../pages/login';
import ProfilePage from '../../../pages/profile';
import RegisterPage from '../../../pages/register';
import getUserById from '../../actions/getUserById';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(
          getUserById({
            uid: user.uid,
            photo: user.photoURL,
          })
        );
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
