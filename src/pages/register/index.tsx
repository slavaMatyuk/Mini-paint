import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createUserAction } from '../../core/actions/authActions';
import Input from '../../core/components/Input';
import StyledButton from '../../core/components/styles/StyledButton';
import StyledContainer from '../../core/components/styles/StyledContainer';
import StyledForm from '../../core/components/styles/StyledForm';
import StyledLinkDiv from '../../core/components/styles/StyledLinkDiv';
import StyledTitle from '../../core/components/styles/StyledTitle';
import RoutesConst from '../../core/constants/routesConst';
import notify from '../../core/helpers/notify';
import { AppState } from '../../core/interfaces';

interface CredentialsProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<CredentialsProps>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const error = useSelector((state: AppState) => state.auth.errorMessage);

  const createUser = (payload: {email: string, password: string}) => {
    dispatch(createUserAction(payload));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      <StyledTitle style={{ fontSize: '24px' }}>Register with e-mail and password</StyledTitle>
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
