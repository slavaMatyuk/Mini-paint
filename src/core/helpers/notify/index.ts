import { toast } from 'react-toastify';
import soundsConst from '../../constants/soundConst';
import playSound from '../playSound';

const notify = (text: string) => {
  toast(
    text, { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT },
  );
  playSound(soundsConst.LIKE);
};

export default notify;
