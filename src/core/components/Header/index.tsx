import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { signOut } from '../../actions/authActions';
import HeaderWrapper from '../../configs/styles/HeaderWrapper';
import StyledTitle from '../../configs/styles/StyledTitle';

const Header: React.FC = React.memo(() => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOut());
  };
  return (
    <HeaderWrapper>
      <div>
        <StyledTitle>Mini Paint</StyledTitle>
        <ToastContainer />
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
    </HeaderWrapper>
  );
});

export default Header;
