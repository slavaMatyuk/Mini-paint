import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setErrorMessage } from '../../actions/authActions';
import { deleteImage } from '../../actions/imageContainerActions';

const ImageContainer: React.FC<any> = ({ image }) => {
  const user = useSelector((state: any) => state.auth.user);
  const error = useSelector((state: any) => state.auth.error);
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
      {error ? toast('Cannot fetch images', { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT }) : ''}
      <div>
        <div>
          <button type="button" onClick={handleRemoveImage}>
            <img alt="trash" src="../../../assets/icons/trash.png" width="20px" height="20px" />
          </button>
        </div>
        <div>
          <h4>{image.userEmail}</h4>
        </div>
        <img src={image.imageURL} alt={image} />
      </div>
    </div>
  );
};

export default ImageContainer;