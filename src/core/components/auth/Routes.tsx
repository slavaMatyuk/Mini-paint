import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import EditorPage from '../../../pages/editor';
import HomePage from '../../../pages/home';
import LoginPage from '../../../pages/login';
import ProfilePage from '../../../pages/profile';
import RegisterPage from '../../../pages/register';
import RoutesConst from '../../constants/routesConst';
import { AppState } from '../../interfaces';

type RouteType = {
  path: string;
  component: FunctionComponent;
};

const publicRoutes: RouteType[] = [
  {
    path: RoutesConst.LOGIN,
    component: LoginPage,
  },
  {
    path: RoutesConst.REGISTER,
    component: RegisterPage,
  },
  {
    path: RoutesConst.ANY,
    component: LoginPage,
  },
];

const privateRoutes: RouteType[] = [
  {
    path: RoutesConst.EDITOR,
    component: EditorPage,
  },
  {
    path: RoutesConst.HOME,
    component: HomePage,
  },
  {
    path: RoutesConst.PROFILE,
    component: ProfilePage,
  },
];

const Routes = () => {
  const authenticated = useSelector<AppState>((state) => state.auth.authenticated);

  return (
    <>
      {authenticated ? (
        <Switch>
          {privateRoutes.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
          <Redirect to={RoutesConst.HOME} />
          ;
        </Switch>
      ) : (
        <Switch>
          {publicRoutes.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
          <Redirect to={RoutesConst.LOGIN} />
        </Switch>
      )}
    </>
  );
};

export default Routes;
