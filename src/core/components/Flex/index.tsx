import React from 'react';
import styled, { StyledFlexProps } from 'styled-components';

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'row'};
  justify-content: ${(props) => props.justify || 'row'};
  margin: ${(props) => props.margin || '0'};
`;

const Flex: React.FC<StyledFlexProps> = ({ children, ...props }) => {
  return <StyledFlex {...props}>{children}</StyledFlex>;
};

export default Flex;
