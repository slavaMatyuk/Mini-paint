import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorMessage, signUpWithEmailAndPassword } from '../../core/actions/authActions';
import Input from '../../core/components/Input';
import StyledButton from '../../core/configs/styles/StyledButton';
import StyledContainer from '../../core/configs/styles/StyledContainer';
import StyledForm from '../../core/configs/styles/StyledForm';
import StyledLinkDiv from '../../core/configs/styles/StyledLinkDiv';
import StyledTitle from '../../core/configs/styles/StyledTitle';
import RoutesConst from '../../core/helpers/constants/routesConst';
import { RootState } from '../../core/reducers';

const RegisterPage: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setErrorMessage('Password do not match!'));
      return;
    }

    dispatch(signUpWithEmailAndPassword(email, password));
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmedPasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setConfirmPassword(event.currentTarget.value);
  };

  return (
    <StyledContainer>
      {error && toast('Auth Error', { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT })}
      <StyledTitle style={{ fontSize: '24px' }}>Register with e-mail and password</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Input type="email" name="email" value={email} onChange={onEmailChange} required label="E-mail" />
        <Input type="password" name="password" value={password} onChange={onPasswordChange} required label="Password" />
        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmedPasswordChange}
          required
          label="Confirm"
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
});

export default RegisterPage;
