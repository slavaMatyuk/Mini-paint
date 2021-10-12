import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button type={'submit' ? 'submit' : 'button'} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
