import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setDataUrlAction } from '../../core/actions/imageContainerActions';
import Canvas from '../../core/components/Canvas';
import ControlsWrapper from '../../core/components/Canvas/styles/ControlsWrapper';
import StyledBtnsInEditor from '../../core/components/Canvas/styles/StyledBtnsInEditor';
import StyledControl from '../../core/components/Canvas/styles/StyledControl';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import EditorWrapper from '../../core/components/styles/common/EditorWrapper';
import StyledOption from '../../core/components/styles/forms/StyledOption';
import StyledSelect from '../../core/components/styles/forms/StyledSelect';
import AMOUNT_OF_WIDTH_POINTS from '../../core/constants/amountOfWidthPoints';
import iconsConst from '../../core/constants/iconsConst';
import RoutesConst from '../../core/constants/routesConst';
import { AppState } from '../../core/interfaces';

const EditorPage: React.FC = () => {
  const [tool, setTool] = useState('brush');
  const [dash, setDash] = useState(false);
  const [blur, setBlur] = useState(0);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const dispatch = useDispatch();

  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);

  const handleDash = () => setDash(dash === false);
  const handleBlur = () => setBlur(blur === 0 ? 10 : 0);
  const handleTool = (currentTool: string) => () => setTool(currentTool);
  const handleColor = (event: React.ChangeEvent<{ value: string }>) => setColor(event.target?.value);
  const handleWidth = (event: React.ChangeEvent<HTMLSelectElement>) => setLineWidth(+event.target.value);

  const setDataUrl = (dataUrl: string) => {
    dispatch(setDataUrlAction(dataUrl, userID, userName));
  };

  return (
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
      <div>
        <ControlsWrapper>
          <StyledControl type="button" className={tool === 'brush' ? 'selected' : ''} onClick={handleTool('brush')}>
            <img src={iconsConst.BRUSH} alt="brush" title="Brush" />
          </StyledControl>
          <StyledControl
            type="button"
            className={tool === 'rectangle' ? 'selected' : ''}
            onClick={handleTool('rectangle')}
          >
            <img src={iconsConst.RECT} alt="rectangle" title="Rectangle" />
          </StyledControl>
          <StyledControl
            type="button"
            className={tool === 'circle' ? 'selected' : ''}
            onClick={handleTool('circle')}
          >
            <img src={iconsConst.CIRCLE} alt="circle" title="Circle" />
          </StyledControl>
          <StyledControl type="button" className={tool === 'line' ? 'selected' : ''} onClick={handleTool('line')}>
            <img src={iconsConst.LINE} alt="line" title="Line" />
          </StyledControl>
          <StyledControl type="button" className={dash ? 'selected' : ''} onClick={handleDash}>
            <img src={iconsConst.DASH} alt="dash" title="Dashed" />
          </StyledControl>
          <StyledControl type="button" className={blur > 0 ? 'selected' : ''} onClick={handleBlur}>
            <img src={iconsConst.BLUR} alt="blur" title="Blur" />
          </StyledControl>
          <input type="color" value={color} onChange={handleColor} name={color} />
          <StyledSelect
            value={lineWidth}
            onChange={handleWidth}
          >
            {AMOUNT_OF_WIDTH_POINTS.map((num) => (
              <StyledOption key={num} value={num}>
                {num}
              </StyledOption>
            ))}
          </StyledSelect>
        </ControlsWrapper>
        <Canvas tool={tool} color={color} dash={dash} blur={blur} lineWidth={lineWidth} setDataUrl={setDataUrl} />
      </div>
    </EditorWrapper>
  );
};

export default EditorPage;
