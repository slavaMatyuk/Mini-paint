import React, { ChangeEventHandler } from 'react';
import StyledFlexRow from '../styles/StyledFlexRow';

interface InputProps {
  type: string;
  className: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text', className, placeholder, value, name, onChange, label,
}) => (
  <StyledFlexRow>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      name={name}
      id={name}
      onChange={onChange}
      required
      autoComplete="on"
    />
  </StyledFlexRow>
);

export default Input;
