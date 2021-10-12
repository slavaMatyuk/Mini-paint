import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import theme from '../../configs/styles/themes/light';
import { createImageInstanceInDB } from '../../actions/imageContainerActions';
import { storage } from '../../configs/firebase';
import StyledOption from '../../configs/styles/StyledOption';
import StyledSelect from '../../configs/styles/StyledSelect';

const Canvas: React.FC = () => {
  const canvasRef = useRef<any>();
  const subCanvasRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const [color, setColor] = useState(theme.primary);
  const [dash, setDash] = useState(false);
  const [blur, setBlur] = useState(0);
  const [lineWidth, setLineWidth] = useState<any>(3);
  const [mouseDownX, setMouseDownX] = useState<any>();
  const [mouseDownY, setMouseDownY] = useState<any>();
  const [context, setContext] = useState<any>();
  const [subContext, setSubContext] = useState<any>();
  const [tool, setTool] = useState('brush');
  const user = useSelector((state: any) => state.auth.user);
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
              (e.pageX - mouseDownX - wrapperRef.current.offsetLeft) ** 2 + (e.pageY - mouseDownY - wrapperRef.current.offsetTop) ** 2
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

  const handleDash = () => {
    setDash(dash === false);
  };
  const handleBlur = () => {
    setBlur(blur === 0 ? 10 : 0);
  };
  const amountOfWidthOption = [];
  for (let i = 1; i < 101; i += 1) {
    amountOfWidthOption.push(i);
  }
  return (
    <div>
      <div>
        <button type="button" color={tool === 'pencil' ? 'primary' : 'inherit'} onClick={() => setTool('brush')}>
          <img src="../../../assets/icons/pencil.png" alt="pencil" />
        </button>
        <button type="button" color={tool === 'rectangle' ? 'primary' : 'inherit'} onClick={() => setTool('rectangle')}>
          <img src="../../../assets/icons/rectangle.png" alt="rectangle" />
        </button>
        <button type="button" color={tool === 'circle' ? 'primary' : 'inherit'} onClick={() => setTool('circle')}>
          <img src="../../../assets/icons/circle.png" alt="circle" />
        </button>
        <button type="button" color={tool === 'line' ? 'primary' : 'inherit'} onClick={() => setTool('line')}>
          <img src="../../../assets/icons/line.png" alt="line" />
        </button>
        <button type="button" color={dash === true ? 'primary' : 'inherit'} onClick={handleDash}>
          Dash
        </button>
        <button type="button" color={blur > 0 ? 'primary' : 'inherit'} onClick={handleBlur}>
          Blur
        </button>
        <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
        <StyledSelect value={lineWidth} onChange={(e: any) => setLineWidth(e.target.value)}>
          {amountOfWidthOption.map((num) => (
            <StyledOption key={num} value={num}>
              {num}
            </StyledOption>
          ))}
        </StyledSelect>
        <button type="button" onClick={clearCanvas}>
          Clear
        </button>
        <button type="button" onClick={saveImage}>
          Save
        </button>
      </div>
      <div ref={wrapperRef}>
        <canvas ref={subCanvasRef} width={600} height={400} />
        <canvas ref={canvasRef} width={600} height={400} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} />
      </div>
    </div>
  );
};

export default Canvas;
