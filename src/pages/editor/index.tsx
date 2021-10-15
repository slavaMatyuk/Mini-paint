import React from 'react';
import { NavLink } from 'react-router-dom';
import Canvas from '../../core/components/Canvas';
import EditorWrapper from '../../core/configs/styles/EditorWrapper';
import StyledBtnsInEditor from '../../core/configs/styles/StyledBtnsInEditor';
import StyledButton from '../../core/configs/styles/StyledButton';
import RoutesConst from '../../core/helpers/constants/routesConst';

const EditorPage: React.FC = () => {
  return (
    <EditorWrapper>
      <StyledBtnsInEditor>
        <StyledButton>
          <NavLink to={RoutesConst.HOME}>Home</NavLink>
        </StyledButton>
        <StyledButton>
          <NavLink to={RoutesConst.PROFILE}>Profile</NavLink>
        </StyledButton>
      </StyledBtnsInEditor>
      <Canvas />
    </EditorWrapper>
  );
};

export default EditorPage;
