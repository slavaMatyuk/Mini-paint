import React from 'react';
import { NavLink } from 'react-router-dom';
import Canvas from '../../core/components/Canvas';
import RoutesConst from '../../core/helpers/constants/routesConst';

const EditorPage: React.FC = () => {
  return (
    <div>
      <div>
        <button type="button">
          <NavLink to={RoutesConst.HOME}>Home</NavLink>
        </button>
        <button type="button">
          <NavLink to={RoutesConst.EDITOR}>Editor</NavLink>
        </button>
      </div>
      <Canvas />
    </div>
  );
};

export default EditorPage;
