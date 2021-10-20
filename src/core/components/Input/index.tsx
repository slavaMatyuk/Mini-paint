import React from 'react';
import StyledFlexRow from '../styles/StyledFlexRow';
import { InputProps } from '../../interfaces';

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
      autoComplete="off"
    />
  </StyledFlexRow>
);

export default Input;
