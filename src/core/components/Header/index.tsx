import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { signOut } from '../../actions/authActions';
import HeaderWrapper from '../../configs/styles/HeaderWrapper';
import StyledAvatar from '../../configs/styles/StyledAvatar';
import StyledButton from '../../configs/styles/StyledButton';
import StyledFlexRow from '../../configs/styles/StyledFlexRow';
import StyledTitle from '../../configs/styles/StyledTitle';
import { RootState } from '../../reducers';

const Header: React.FC = React.memo(() => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOut());
  };
  return (
    <HeaderWrapper>
      <StyledFlexRow style={{ width: '100%' }}>
        <StyledTitle>Mini Paint</StyledTitle>
        <ToastContainer autoClose={2000} />
        {user ? (
          <StyledFlexRow style={{ width: '320px' }}>
            <StyledTitle style={{ fontSize: '20px' }}>{user.email}</StyledTitle>
            {user.photo ? (
              <img alt="user avatar" src={user.photo ? user.photo : ''} />
            ) : (
              <StyledAvatar>{user.email && user.email.substring(0, 1).toUpperCase()}</StyledAvatar>
            )}
            <StyledButton type="button" onClick={onSignOut}>
              Sign out
            </StyledButton>
          </StyledFlexRow>
        ) : (
          ''
        )}
      </StyledFlexRow>
    </HeaderWrapper>
  );
});

export default Header;
