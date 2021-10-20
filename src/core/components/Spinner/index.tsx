import React from 'react';
import StyledSpinner from '../styles/StyledSpinner';

const Spinner: React.FC = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle id="path" cx="25" cy="25" r="20" fill="none" />
  </StyledSpinner>
);

export default Spinner;
