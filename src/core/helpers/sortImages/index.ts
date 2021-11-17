import { ImageType } from '../../reducers/imageReducer';

const sortImages = (imagesData: ImageType[], userName: string) => imagesData
  .filter((userImages: {userName: string}) => userImages.userName === userName);

export default sortImages;
