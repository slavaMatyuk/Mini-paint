import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setDataUrlAction } from '../../actions/imageContainerActions';
import iconsConst from '../../helpers/constants/iconsConst';
import { AppState } from '../../interfaces';
import CanvasWrapper from '../styles/CanvasWrapper';
import StyledCanvasBtns from '../styles/StyledCanvasBtns';
import StyledCommonCanvas from '../styles/StyledCommonCanvas';
import StyledControl from '../styles/StyledControl';

interface CanvasProps {
  tool: string;
  color: string;
  dash: boolean;
  blur: number;
  lineWidth: number;
}

const Canvas: React.FC<CanvasProps> = ({
  tool, color, dash, blur, lineWidth,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const subCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [mouseDownX, setMouseDownX] = useState<number | null>();
  const [mouseDownY, setMouseDownY] = useState<number | null>();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [subContext, setSubContext] = useState<CanvasRenderingContext2D | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);

  useEffect(() => {
    if (canvasRef.current && subCanvasRef.current && wrapperRef.current?.clientWidth) {
      setCanvasWidth(wrapperRef.current.offsetWidth);
      setCanvasHeight(wrapperRef.current.offsetHeight);
      setContext(canvasRef.current.getContext('2d'));
      setSubContext(subCanvasRef.current.getContext('2d'));
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && subCanvasRef.current && wrapperRef.current?.clientWidth) {
      canvasRef.current.width = subCanvasRef.current.width;
      canvasRef.current.height = subCanvasRef.current.height;
      subCanvasRef.current.width = canvasWidth;
      subCanvasRef.current.height = canvasHeight;
    }
  }, [canvasWidth, canvasHeight]);

  const clearContext = (ctx: CanvasRenderingContext2D, ref: React.MutableRefObject<HTMLCanvasElement>) => {
    ctx.clearRect(0, 0, ref.current.width, ref.current.height);
  };

  const clearCanvas = () => {
    if (context && subContext && canvasRef && subCanvasRef) {
      clearContext(context, canvasRef as React.MutableRefObject<HTMLCanvasElement>);
      clearContext(subContext, subCanvasRef as React.MutableRefObject<HTMLCanvasElement>);
    }
  };

  const setDataUrl = (dataUrl: string) => {
    dispatch(setDataUrlAction(dataUrl, userID, userName));
  };

  const handleSaveImage = () => {
    if (subContext) {
      setDataUrl(subContext?.canvas.toDataURL());
      history.push('/');
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const target = e.target as HTMLCanvasElement;
    setMouseDownX(e.pageX - target.offsetLeft);
    setMouseDownY(e.pageY - target.offsetTop);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const target = e.target as HTMLCanvasElement;
    if (context && mouseDownX && mouseDownY && wrapperRef.current && canvasRef.current) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = 'round';
      context.shadowColor = color;
      context.shadowBlur = blur;

      const width = e.pageX - mouseDownX - wrapperRef.current!.offsetLeft;
      const height = e.pageY - mouseDownY - wrapperRef.current!.offsetTop;

      if (dash) {
        context.setLineDash([4, 16]);
      } else {
        context.setLineDash([]);
      }

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      switch (tool) {
        case 'brush':
          context.lineTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
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
              (e.pageX - mouseDownX - wrapperRef.current.offsetLeft) ** 2
                + (e.pageY - mouseDownY - wrapperRef.current.offsetTop) ** 2,
            ),
            0,
            Math.PI * 2,
            false,
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
      subContext.drawImage(canvasRef.current!, 0, 0);
      context.beginPath();
      setMouseDownX(null);
      setMouseDownY(null);
    }
  };

  return (
    <StyledCommonCanvas>
      <StyledCanvasBtns>
        <StyledControl onClick={clearCanvas}>
          <img src={iconsConst.CLEAR} alt="clear" title="Clear" />
        </StyledControl>
        <StyledControl onClick={handleSaveImage}>
          <img src={iconsConst.SAVE} alt="save" title="Save" />
        </StyledControl>
      </StyledCanvasBtns>
      <CanvasWrapper ref={wrapperRef}>
        <canvas ref={subCanvasRef} width={canvasWidth} height={canvasHeight} />
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </CanvasWrapper>
    </StyledCommonCanvas>
  );
};

export default Canvas;
