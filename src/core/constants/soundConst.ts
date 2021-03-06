import ClearSoundURL from '../../assets/sounds/clear-click.mp3';
import SaveSoundURL from '../../assets/sounds/save-click.mp3';
import NaviSoundURL from '../../assets/sounds/navi-click.mp3';
import ToolSoundURL from '../../assets/sounds/tool-click.mp3';
import SliderSoundURL from '../../assets/sounds/slider-click.mp3';
import OnClickSoundURL from '../../assets/sounds/on-click.mp3';
import OffClickSoundURL from '../../assets/sounds/off-click.mp3';
import LikeSoundURL from '../../assets/sounds/like-click.mp3';
import KeySoundURL from '../../assets/sounds/key-click.mp3';
import LogInSoundURL from '../../assets/sounds/login-click.mp3';
import LogOutSoundURL from '../../assets/sounds/logout-click.mp3';
import DaySoundURL from '../../assets/sounds/day-click.mp3';
import NightSoundURL from '../../assets/sounds/night-click.mp3';
import SearchSoundURL from '../../assets/sounds/search-click.mp3';

interface SoundConst {
  [key: string]: string
}

const soundsConst = <SoundConst>{
  CLEAR: ClearSoundURL,
  SAVE: SaveSoundURL,
  NAVI: NaviSoundURL,
  TOOL: ToolSoundURL,
  SLIDER: SliderSoundURL,
  ON: OnClickSoundURL,
  OFF: OffClickSoundURL,
  LIKE: LikeSoundURL,
  KEY: KeySoundURL,
  LOGIN: LogInSoundURL,
  LOGOUT: LogOutSoundURL,
  DAY: DaySoundURL,
  NIGHT: NightSoundURL,
  SEARCH: SearchSoundURL,
};

export default soundsConst;
