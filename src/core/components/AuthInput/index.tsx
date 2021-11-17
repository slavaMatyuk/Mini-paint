import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import StyledFlexRow from '../styles/common/StyledFlexRow';

export interface InputProps {
  type: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  label: string;
}

const AuthInput: React.FC<InputProps> = ({
  type = 'text', value, name, onChange, onFocus, label,
}) => (
  <StyledFlexRow>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      value={value}
      name={name}
      id={name}
      onChange={onChange}
      onFocus={onFocus}
      required
      autoComplete="on"
    />
  </StyledFlexRow>
);

export default AuthInput;
