import React from 'react';
import { NavLink } from 'react-router-dom';
import Canvas from '../../core/components/Canvas';
import EditorWrapper from '../../core/components/styles/EditorWrapper';
import StyledBtnsInEditor from '../../core/components/styles/StyledBtnsInEditor';
import StyledButton from '../../core/components/styles/StyledButton';
import RoutesConst from '../../core/helpers/constants/routesConst';

const EditorPage: React.FC = () => (
  <EditorWrapper>
    <StyledBtnsInEditor>
      <NavLink to={RoutesConst.HOME}>
        <StyledButton type="submit">
          Home
        </StyledButton>
      </NavLink>
      <NavLink to={RoutesConst.PROFILE}>
        <StyledButton type="submit">
          Profile
        </StyledButton>
      </NavLink>
    </StyledBtnsInEditor>
    <Canvas />
  </EditorWrapper>
);

export default EditorPage;
