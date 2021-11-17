import soundsConst from '../../constants/soundConst';

const playSound = (url: string) => {
  const audio = new Audio(url);

  audio.volume = 0.5;
  audio.currentTime = 0;
  audio.play();
};

export const playDefaultButton = () => {
  playSound(soundsConst.NAVI);
};

export default playSound;
