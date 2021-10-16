import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteImage, fetchImages } from '../../core/actions/imageContainerActions';
import ImageContainer from '../../core/components/ImageContainer';
import StyledAvatar from '../../core/configs/styles/StyledAvatar';
import StyledButton from '../../core/configs/styles/StyledButton';
import StyledContainer from '../../core/configs/styles/StyledContainer';
import StyledTitle from '../../core/configs/styles/StyledTitle';
import RoutesConst from '../../core/helpers/constants/routesConst';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { ImagePropsType, ImageType, RootStateType } from '../../core/interfaces';

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
      <StyledButton type="submit">
        <NavLink to={RoutesConst.HOME}>Home</NavLink>
      </StyledButton>
      <StyledContainer style={{ marginTop: '20px' }}>
        <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
        <StyledTitle style={{ fontSize: '28px' }}>{userName && getNameFromEmail(userName)}</StyledTitle>
      </StyledContainer>
      <div>
        {images && images.length > 0 ? (
          images.map((image: ImageType) => <ImageContainer image={image} key={image.imageId} />)
        ) : (
          <StyledTitle>No any pictures</StyledTitle>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
