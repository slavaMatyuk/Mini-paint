import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createUserAction } from '../../core/actions/authActions';
import Input from '../../core/components/Input';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledContainer from '../../core/components/styles/common/StyledContainer';
import StyledForm from '../../core/components/styles/forms/StyledForm';
import StyledLinkDiv from '../../core/components/styles/common/StyledLinkDiv';
import RoutesConst from '../../core/constants/routesConst';
import notify from '../../core/helpers/notify';
import { AppState } from '../../core/interfaces';
import StyledRegTitle from './styles/StyledRegTitle';

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

  return (
    <StyledContainer>
      <StyledRegTitle>Register with e-mail and password</StyledRegTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={credentials.email}
          onChange={onInputChange}
          label="E-mail"
          className=""
          placeholder=""
        />
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={onInputChange}
          label="Password"
          className=""
          placeholder=""
        />
        <Input
          type="password"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={onInputChange}
          label="Confirm"
          className=""
          placeholder=""
        />
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
