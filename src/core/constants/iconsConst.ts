import BrushIMG from '../../assets/icons/pencil.png';
import LineIMG from '../../assets/icons/line.png';
import RectIMG from '../../assets/icons/rectangle.png';
import CircleIMG from '../../assets/icons/circle.png';
import ClearIMG from '../../assets/icons/trash.png';
import SaveIMG from '../../assets/icons/saving.png';
import BlurIMG from '../../assets/icons/blur.png';
import DashIMG from '../../assets/icons/dash.png';

interface IconConst {
  [key: string]: string
}

const iconsConst = <IconConst>{
  BRUSH: BrushIMG,
  LINE: LineIMG,
  RECT: RectIMG,
  CIRCLE: CircleIMG,
  CLEAR: ClearIMG,
  SAVE: SaveIMG,
  BLUR: BlurIMG,
  DASH: DashIMG,
};

export default iconsConst;
