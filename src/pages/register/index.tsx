import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createUserAction, resetErrorAction } from '../../core/actions/authActions';
import AuthInput from '../../core/components/AuthInput';
import StyledButton from '../../core/styles/buttons/StyledButton';
import StyledContainer from '../../core/styles/common/StyledContainer';
import StyledLinkDiv from '../../core/styles/common/StyledLinkDiv';
import StyledForm from '../../core/styles/forms/StyledForm';
import RoutesConst from '../../core/constants/routesConst';
import notify from '../../core/helpers/notify';
import { AppState } from '../../core/interfaces';
import StyledRegTitle from './styles/StyledRegTitle';
import RENDER_REGISTER_INPUT from '../../core/constants/inputConst';
import playSound, { playDefaultButton } from '../../core/helpers/playSound';
import soundsConst from '../../core/constants/soundConst';
import isValidEmail from '../../core/helpers/isValidEmail';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const error = useSelector((state: AppState) => state.auth.errorMessage);

  if (error) {
    notify(`${error}`);
  }

  const createUser = (payload: {email: string, password: string}) => {
    dispatch(createUserAction(payload));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidEmail(credentials.email)) {
      createUser(credentials);
    } else {
      notify('Max length of email shall be not more than 50');
      return;
    }
    if (error) {
      notify(`${error}`);
    } else {
      playSound(soundsConst.LOGIN);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    playSound(soundsConst.KEY);
  };

  const resetError = () => {
    dispatch(resetErrorAction());
  };

  return (
    <StyledContainer>
      <StyledRegTitle>Register with e-mail and password</StyledRegTitle>
      <StyledForm onSubmit={handleSubmit}>
        {
        RENDER_REGISTER_INPUT(credentials, onInputChange, resetError).map((elem) => (
          <AuthInput
            key={elem.name}
            type={elem.type}
            value={elem.value}
            name={elem.name}
            onChange={elem.onChange}
            onFocus={elem.onFocus}
            label={elem.label}
          />
        ))
        }
        <StyledLinkDiv>
          <Link to={RoutesConst.LOGIN}>
            <StyledButton type="button" onClick={playDefaultButton}>Back</StyledButton>
          </Link>
          <StyledButton type="submit">Register</StyledButton>
        </StyledLinkDiv>
      </StyledForm>
    </StyledContainer>
  );
};

export default RegisterPage;
