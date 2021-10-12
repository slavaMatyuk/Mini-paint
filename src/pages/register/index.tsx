import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorMessage, signUpWithEmailAndPassword } from '../../core/actions/authActions';
import routesConst from '../../core/helpers/constants/routesConst';

const RegisterPage: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const error = useSelector((state: any) => state.auth.error);

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
    <div>
      {error ? toast('Auth Error', { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT }) : ''}
      <h2>Register with e-mail and password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={email} onChange={onEmailChange} required />
        <input type="password" name="password" value={password} onChange={onPasswordChange} required />
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onConfirmedPasswordChange} required />
        <div>
          <Link to={routesConst.LOGIN}>
            <button type="button">BACK</button>
          </Link>
          <button type="submit">REGISTER</button>
        </div>
      </form>
    </div>
  );
});

export default RegisterPage;
