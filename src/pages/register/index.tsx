import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createUserAction, resetErrorAction } from '../../core/actions/authActions';
import AuthInput from '../../core/components/AuthInput';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledContainer from '../../core/components/styles/common/StyledContainer';
import StyledLinkDiv from '../../core/components/styles/common/StyledLinkDiv';
import StyledForm from '../../core/components/styles/forms/StyledForm';
import RoutesConst from '../../core/constants/routesConst';
import notify from '../../core/helpers/notify';
import { AppState } from '../../core/interfaces';
import StyledRegTitle from './styles/StyledRegTitle';
import RENDER_REGISTER_INPUT from '../../core/constants/inputConst';

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
    createUser(credentials);
    if (error) {
      notify(`${error}`);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
            <StyledButton type="button">Back</StyledButton>
          </Link>
          <StyledButton type="submit">Register</StyledButton>
        </StyledLinkDiv>
      </StyledForm>
    </StyledContainer>
  );
};

export default RegisterPage;
