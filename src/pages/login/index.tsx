import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { logInAction, resetErrorAction } from '../../core/actions/authActions';
import AuthInput from '../../core/components/AuthInput';
import StyledButton from '../../core/styles/buttons/StyledButton';
import StyledContainer from '../../core/styles/common/StyledContainer';
import StyledLinkDiv from '../../core/styles/common/StyledLinkDiv';
import StyledForm from '../../core/styles/forms/StyledForm';
import RoutesConst from '../../core/constants/routesConst';
import soundsConst from '../../core/constants/soundConst';
import notify from '../../core/helpers/notify';
import playSound, { playDefaultButton } from '../../core/helpers/playSound';
import { AppState } from '../../core/interfaces';
import StyledLoginTitle from './styles/StyledLoginTitle';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => state.auth.errorMessage);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    playSound(soundsConst.KEY);
  };

  const signIn = (payload: {email: string, password: string}) => {
    dispatch(logInAction(payload));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(credentials);
    if (error) {
      notify('Please, enter correct data or register!');
    } else {
      playSound(soundsConst.LOGIN);
    }
  };

  const resetError = () => {
    dispatch(resetErrorAction());
  };

  return (
    <StyledContainer>
      <StyledLoginTitle>Log in with email and password</StyledLoginTitle>
      <StyledForm onSubmit={handleSubmit}>
        <AuthInput
          value={credentials.email}
          onChange={onInputChange}
          onFocus={resetError}
          type="email"
          label="E-mail"
          name="email"
        />
        <AuthInput
          value={credentials.password}
          onChange={onInputChange}
          onFocus={resetError}
          type="password"
          label="Password"
          name="password"
        />
        <StyledButton>Log in</StyledButton>
      </StyledForm>
      <StyledLoginTitle>I still have no account</StyledLoginTitle>
      <StyledLinkDiv>
        <Link to={RoutesConst.REGISTER}>
          <StyledButton onClick={playDefaultButton}>Register me</StyledButton>
        </Link>
      </StyledLinkDiv>
    </StyledContainer>
  );
};

export default LoginPage;
