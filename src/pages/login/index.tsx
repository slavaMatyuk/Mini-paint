import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmail } from '../../core/actions/authActions';
import Input from '../../core/components/Input';
import StyledButton from '../../core/configs/styles/StyledButton';
import StyledContainer from '../../core/configs/styles/StyledContainer';
import StyledForm from '../../core/configs/styles/StyledForm';
import StyledLinkDiv from '../../core/configs/styles/StyledLinkDiv';
import StyledTitle from '../../core/configs/styles/StyledTitle';
import RoutesConst from '../../core/helpers/constants/routesConst';
import { RootState } from '../../core/reducers';

const LoginPage: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(signInWithEmail(email, password));
    setEmail('');
    setPassword('');
  };

  return (
    <StyledContainer>
      {error && toast('Auth Error', { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT })}
      <StyledTitle style={{ fontSize: '24px' }}>Log in with email and password</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Input value={email} onChange={onEmailChange} required type="email" label="E-mail" />
        <Input value={password} onChange={onPasswordChange} required type="password" label="Password" />
        <StyledButton>Log in</StyledButton>
      </StyledForm>
      <StyledTitle style={{ fontSize: '24px' }}>I still have no account</StyledTitle>
      <StyledLinkDiv>
        <Link to={RoutesConst.REGISTER}>
          <StyledButton>Register me</StyledButton>
        </Link>
      </StyledLinkDiv>
    </StyledContainer>
  );
});

export default LoginPage;
