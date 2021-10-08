import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../../actions/logout';

const Header: React.FC = React.memo(() => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div>
        <h1>Paint</h1>
        {user ? (
          <div>
            <h1>{user.email}</h1>
            <img alt="User profile" src={user.photo ? user.photo : ''} />
            <button type="button" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
});

export default Header;
