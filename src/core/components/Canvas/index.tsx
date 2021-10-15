import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import theme from '../../configs/styles/themes/light';
import { createImageInstanceInDB } from '../../actions/imageContainerActions';
import { storage } from '../../configs/firebase';
import StyledOption from '../../configs/styles/StyledOption';
import StyledSelect from '../../configs/styles/StyledSelect';
import { RootState } from '../../reducers';
import Input from '../Input';
import CanvasWrapper from '../../configs/styles/CanvasWrapper';
import StyledControl from '../../configs/styles/StyledControl';
import BrushPath from '../../../assets/icons/pencil.png';
import LinePath from '../../../assets/icons/line.png';
import RectPath from '../../../assets/icons/rectangle.png';
import CirclePath from '../../../assets/icons/circle.png';
import ClearPath from '../../../assets/icons/trash.png';
import SavePath from '../../../assets/icons/saving.png';
import BlurPath from '../../../assets/icons/blur.png';
import DashPath from '../../../assets/icons/dash.png';
import ControlsWrapper from '../../configs/styles/ControlsWrapper';

const Canvas: React.FC = () => {
  const canvasRef = useRef<any>();
  const subCanvasRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const [color, setColor] = useState(theme.text);
  const [dash, setDash] = useState(false);
  const [blur, setBlur] = useState(0);
  const [lineWidth, setLineWidth] = useState<any>(3);
  const [mouseDownX, setMouseDownX] = useState<any>();
  const [mouseDownY, setMouseDownY] = useState<any>();
  const [context, setContext] = useState<any>();
  const [subContext, setSubContext] = useState<any>();
  const [tool, setTool] = useState('brush');
  const user = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (canvasRef.current && subCanvasRef.current) {
      setContext(canvasRef.current.getContext('2d'));
      setSubContext(subCanvasRef.current.getContext('2d'));
    }
  }, []);

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    subContext.clearRect(0, 0, subCanvasRef.current.width, subCanvasRef.current.height);
  };

  const onMouseDown = (e: any) => {
    setMouseDownX(e.pageX - e.target.offsetLeft);
    setMouseDownY(e.pageY - e.target.offsetTop);
  };

  const onMouseMove = (e: any) => {
    if (context && mouseDownX && mouseDownY && wrapperRef.current && canvasRef.current) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = 'round';
      context.shadowColor = color;
      context.shadowBlur = blur;

      const width = e.pageX - mouseDownX - wrapperRef.current.offsetLeft;
      const height = e.pageY - mouseDownY - wrapperRef.current.offsetTop;

      if (dash) {
        context.setLineDash([4, 16]);
      } else {
        context.setLineDash([]);
      }

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      switch (tool) {
        case 'brush':
          context.lineTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
          context.stroke();
          break;
        case 'rectangle':
          context.strokeRect(mouseDownX, mouseDownY, width, height);
          context.stroke();
          break;
        case 'circle':
          context.beginPath();
          context.arc(
            mouseDownX,
            mouseDownY,
            Math.sqrt(
              (e.pageX - mouseDownX - wrapperRef.current.offsetLeft) ** 2 +
                (e.pageY - mouseDownY - wrapperRef.current.offsetTop) ** 2
            ),
            0,
            Math.PI * 2,
            false
          );
          context.stroke();
          break;
        case 'line':
          context.beginPath();
          context.moveTo(mouseDownX, mouseDownY);
          context.lineTo(e.pageX - wrapperRef.current.offsetLeft, e.pageY - wrapperRef.current.offsetTop);
          context.stroke();
          break;
        default:
          break;
      }
    }
  };

  const onMouseUp = () => {
    if (context && subContext) {
      subContext.drawImage(canvasRef.current, 0, 0);
      context.beginPath();
      setMouseDownX(null);
      setMouseDownY(null);
    }
  };

  const saveImage = async () => {
    const date = Date.now();
    const imageURL = subContext?.canvas?.toDataURL();
    const imagePath = `library/${user.uid}/photo${date}.png`;
    await storage.ref().child(imagePath).putString(imageURL, 'data_url');
    const imageDatabaseURL = await storage.ref(`library/${user.uid}/photo${date}.png`).getDownloadURL();
    dispatch(createImageInstanceInDB(user, imageDatabaseURL, date, imagePath));
    history.push('/');
  };

  const handleDash = () => setDash(dash === false);

  const handleBlur = () => setBlur(blur === 0 ? 10 : 0);

  const amountOfWidthOption = [];
  for (let i = 1; i < 101; i += 1) {
    amountOfWidthOption.push(i);
  }

  return (
    <div>
      <ControlsWrapper>
        <StyledControl type="button" color={tool === 'brush' ? 'primary' : 'inherit'} onClick={() => setTool('brush')}>
          <img src={BrushPath} alt="brush" title="Brush" />
        </StyledControl>
        <StyledControl
          type="button"
          color={tool === 'rectangle' ? 'primary' : 'inherit'}
          onClick={() => setTool('rectangle')}
        >
          <img src={RectPath} alt="rectangle" title="Rectangle" />
        </StyledControl>
        <StyledControl
          type="button"
          color={tool === 'circle' ? 'primary' : 'inherit'}
          onClick={() => setTool('circle')}
        >
          <img src={CirclePath} alt="circle" title="Circle" />
        </StyledControl>
        <StyledControl type="button" color={tool === 'line' ? 'primary' : 'inherit'} onClick={() => setTool('line')}>
          <img src={LinePath} alt="line" title="Line" />
        </StyledControl>
        <StyledControl type="button" color={dash ? 'primary' : 'inherit'} onClick={handleDash}>
          <img src={DashPath} alt="dash" title="Dashed" />
        </StyledControl>
        <StyledControl type="button" color={blur > 0 ? 'primary' : 'inherit'} onClick={handleBlur}>
          <img src={BlurPath} alt="blur" title="Blur" />
        </StyledControl>
        <Input type="color" value={color} onChange={(event) => setColor(event.target.value)} label="" />
        <StyledSelect value={lineWidth} style={{ width: '60px' }} onChange={(e) => setLineWidth(e.target.value)}>
          {amountOfWidthOption.map((num) => (
            <StyledOption key={num} value={num}>
              {num}
            </StyledOption>
          ))}
        </StyledSelect>
        <StyledControl onClick={clearCanvas}>
          <img src={ClearPath} alt="clear" title="Clear" />
        </StyledControl>
        <StyledControl onClick={saveImage}>
          <img src={SavePath} alt="save" title="Save" />
        </StyledControl>
      </ControlsWrapper>
      <CanvasWrapper ref={wrapperRef}>
        <canvas ref={subCanvasRef} width={600} height={400} />
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </CanvasWrapper>
    </div>
  );
};

export default Canvas;
