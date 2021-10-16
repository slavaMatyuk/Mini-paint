import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, fetchImages } from '../../core/actions/imageContainerActions';
import StyledAvatar from '../../core/configs/styles/StyledAvatar';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { ImagePropsType, RootStateType } from '../../core/interfaces';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootStateType) => state.auth.user?.email);
  const images = useSelector((state: RootStateType) => state.images.images);
  // const id = useSelector((state: ImagePropsType) => state.image.imageId);
  // const imgUrl = useSelector((state: ImagePropsType) => state.image.imageURL);
  // const delUserImageFromDB = () => dispatch(deleteImage(id, imgUrl));

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, userName]);

  return (
    <div>
      <div>
        <div>
          <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
          <h3>{userName && getNameFromEmail(userName)}</h3>
        </div>
        <div>
          {images.map((image, key) => {
            return (
              <div key={+key}>
                <div>
                  <img src={image.imageURL} alt={image.imageURL} />
                </div>
                <div>
                  <button type="button" onClick={() => console.log('nothing')}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
