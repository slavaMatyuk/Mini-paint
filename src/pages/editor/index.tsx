import React from 'react';
import { NavLink } from 'react-router-dom';
import Canvas from '../../core/components/Canvas';
import routesConst from '../../core/helpers/constants/routesConst';

const EditorPage: React.FC = () => {
  return (
    <div>
      <div>
        <button type="button">
          <NavLink to={routesConst.HOME}>Home</NavLink>
        </button>
        <button type="button">
          <NavLink to={routesConst.EDITOR}>Editor</NavLink>
        </button>
      </div>
      <Canvas />
    </div>
  );
};

export default EditorPage;
