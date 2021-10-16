import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorMessage } from '../../actions/authActions';
import { deleteImage } from '../../actions/imageContainerActions';
import { ImagePropsType } from '../../interfaces';
import { RootState } from '../../reducers';
import ClearPath from '../../../assets/icons/trash.png';

const ImageContainer: React.FC<ImagePropsType> = ({ image }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  // const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();

  const handleRemoveImage = async () => {
    if (user.email === image.userEmail) {
      dispatch(deleteImage(image.imagePath, image.imageId));
    } else {
      dispatch(setErrorMessage('Sorry, You cannot delete this picture'));
    }
  };
  return (
    <div>
      <div>
        <div>
          <button type="button" onClick={handleRemoveImage}>
            <img alt="trash" src={ClearPath} width="15px" height="15px" />
          </button>
        </div>
        <div>
          <h4>{image.userEmail}</h4>
        </div>
        <img src={image.imageURL} alt="user drawing" />
      </div>
    </div>
  );
};

export default ImageContainer;
