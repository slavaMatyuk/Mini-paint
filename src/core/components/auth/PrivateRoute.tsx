import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import RoutesConst from '../../helpers/constants/routesConst';
import { RootState } from '../../reducers';

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect to={RoutesConst.LOGIN} />)} />
  );
};

export default PrivateRoute;
