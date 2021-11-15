const RENDER_REGISTER_INPUT = (
  credentials: {
    email: string;
    password: string;
    confirmPassword: string;
  },
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus: () => void,
) => [
  {
    type: 'email',
    name: 'email',
    value: credentials.email,
    onChange,
    onFocus,
    label: 'E-mail',
  },
  {
    type: 'password',
    name: 'password',
    value: credentials.password,
    onChange,
    onFocus,
    label: 'Password',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    value: credentials.confirmPassword,
    onChange,
    onFocus,
    label: 'Confirm',
  },
];

export default RENDER_REGISTER_INPUT;
