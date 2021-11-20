import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAction } from '../../actions/authActions';
import soundsConst from '../../constants/soundConst';
import playSound from '../../helpers/playSound';
import { AppState } from '../../interfaces';
import StyledButton from '../../styles/buttons/StyledButton';
import FlexRowContainer from '../../styles/common/FlexRowContrainer';
import StyledTitle from '../../styles/common/StyledTitle';
import ToggleTheme from '../ToggleTheme';
import HeaderWrapper from './styles/HeaderWrapper';
import StyledFlexWrap from './styles/StyledFlexWrap';
import StyledHeaderFlexRow from './styles/StyledHeaderFlexRow';
import StyledUserName from './styles/StyledUserName';

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
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
        <FlexRowContainer>
          <StyledTitle>Mini Paint</StyledTitle>
          <ToggleTheme toggleTheme={toggleTheme} />
        </FlexRowContainer>
        {authenticated && (
          <StyledHeaderFlexRow>
            <StyledUserName>{userName}</StyledUserName>
            <StyledButton type="button" onClick={signOut}>
              Sign out
            </StyledButton>
          </StyledHeaderFlexRow>
        )}
      </StyledFlexWrap>
    </HeaderWrapper>
  );
};

export default Header;
