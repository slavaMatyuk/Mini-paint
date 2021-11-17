import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderWrapper from './styles/HeaderWrapper';
import { logOutAction } from '../../actions/authActions';
import { AppState } from '../../interfaces';
import StyledButton from '../styles/buttons/StyledButton';
import StyledAvatar from '../styles/common/StyledAvatar';
import StyledFlexRow from '../styles/common/StyledFlexRow';
import StyledTitle from '../styles/common/StyledTitle';
import StyledFlexWrap from './styles/StyledFlexWrap';
import StyledUserName from './styles/StyledUserName';
import playSound from '../../helpers/playSound';
import soundsConst from '../../constants/soundConst';

const Header: React.FC = () => {
  const authenticated = useSelector((state: AppState) => state.auth.authenticated);
  const userName = useSelector((state: AppState) => state.auth.userName);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOutAction());
    playSound(soundsConst.LOGOUT);
  };

  return (
    <HeaderWrapper>
      <StyledFlexWrap>
        <StyledTitle>Mini Paint</StyledTitle>
        {authenticated && (
          <StyledFlexRow>
            <StyledUserName>{userName}</StyledUserName>
            <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
            <StyledButton type="button" onClick={signOut}>
              Sign out
            </StyledButton>
          </StyledFlexRow>
        )}
      </StyledFlexWrap>
    </HeaderWrapper>
  );
};

export default Header;
