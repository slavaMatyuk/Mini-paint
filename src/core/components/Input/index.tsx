import React from 'react';
import { InputProps } from '../../interfaces';

const Input: React.FC<InputProps> = ({ type = 'text', placeholder, value, name, onChange, label }) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
        <input type={type} placeholder={placeholder} value={value} name={name} id={name} onChange={onChange} required autoComplete="off" />
      </div>
    </div>
  );
};

export default Input;
