import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { logInAction } from '../../core/actions/authActions';
import Input from '../../core/components/Input';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledContainer from '../../core/components/styles/common/StyledContainer';
import StyledForm from '../../core/components/styles/forms/StyledForm';
import StyledLinkDiv from '../../core/components/styles/common/StyledLinkDiv';
import RoutesConst from '../../core/constants/routesConst';
import notify from '../../core/helpers/notify';
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
  };

  const signIn = (payload: {email: string, password: string}) => {
    dispatch(logInAction(payload));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signIn(credentials);
    if (error) {
      notify('Please, enter correct data or register!');
    }
  };

  return (
    <StyledContainer>
      <StyledLoginTitle>Log in with email and password</StyledLoginTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          value={credentials.email}
          onChange={onInputChange}
          type="email"
          label="E-mail"
          className=""
          placeholder=""
          name="email"
        />
        <Input
          value={credentials.password}
          onChange={onInputChange}
          type="password"
          label="Password"
          className=""
          placeholder=""
          name="password"
        />
        <StyledButton>Log in</StyledButton>
      </StyledForm>
      <StyledLoginTitle>I still have no account</StyledLoginTitle>
      <StyledLinkDiv>
        <Link to={RoutesConst.REGISTER}>
          <StyledButton>Register me</StyledButton>
        </Link>
      </StyledLinkDiv>
    </StyledContainer>
  );
};

export default LoginPage;
