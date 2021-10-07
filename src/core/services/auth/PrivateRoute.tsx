import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import routesConst from '../../helpers/constants/routesConst';
import { RootState } from '../store';

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : <Redirect to={routesConst.LOGIN} />)} />;
};

export default PrivateRoute;