import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import HeaderWrapper from './styles/HeaderWrapper';
import { logOutAction } from '../../actions/authActions';
import { AppState } from '../../interfaces';
import StyledButton from '../styles/buttons/StyledButton';
import StyledAvatar from '../styles/common/StyledAvatar';
import StyledFlexRow from '../styles/common/StyledFlexRow';
import StyledTitle from '../styles/common/StyledTitle';

const Header: React.FC = () => {
  const authenticated = useSelector((state: AppState) => state.auth.authenticated);
  const userName = useSelector((state: AppState) => state.auth.userName);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOutAction());
  };

  return (
    <HeaderWrapper>
      <StyledFlexRow style={{ width: '100%' }}>
        <StyledTitle>Mini Paint</StyledTitle>
        <ToastContainer autoClose={3000} />
        {authenticated ? (
          <StyledFlexRow>
            <StyledTitle style={{ fontSize: '20px', marginRight: '10px' }}>{userName}</StyledTitle>
            <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
            <StyledButton type="button" onClick={signOut}>
              Sign out
            </StyledButton>
          </StyledFlexRow>
        ) : (
          ''
        )}
      </StyledFlexRow>
    </HeaderWrapper>
  );
};

export default Header;
