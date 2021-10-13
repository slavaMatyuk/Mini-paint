import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, fetchImages } from '../../core/actions/imageContainerActions';
import { ImageType, RootStateType } from '../../core/interfaces';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootStateType) => state.auth.user?.email);
  const images = useSelector((state: RootStateType) => state.images.images);
  const id = useSelector((state: ImageType) => state.imageId);
  const imgUrl = useSelector((state: ImageType) => state.imageURL);
  const delUserImageFromDB = () => dispatch(deleteImage(id, imgUrl));

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, userName]);

  return (
    <div>
      <div>
        <div>
          <div>{userName && userName.substr(0, 1).toUpperCase()}</div>
          <h3>{userName}</h3>
        </div>
        <div>
          {images.map((image: { id: string; imgUrl: string }, key: number) => {
            return (
              <div key={+key}>
                <div>
                  <img src={image.imgUrl} alt={image.imgUrl} />
                </div>
                <div>
                  <button type="button" onClick={delUserImageFromDB}>
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
