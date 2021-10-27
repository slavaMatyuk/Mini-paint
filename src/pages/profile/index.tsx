import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  delUserImageFromDbAction,
  getUserIDAction,
  getUserImagesFromDbAction,
  getUserNameAction,
} from '../../core/actions/imageContainerActions';
import Spinner from '../../core/components/Spinner';
import CanvasWrapper from '../../core/components/styles/CanvasWrapper';
import StyledAvatar from '../../core/components/styles/StyledAvatar';
import StyledButton from '../../core/components/styles/StyledButton';
import StyledContainer from '../../core/components/styles/StyledContainer';
import StyledDeleteBtn from '../../core/components/styles/StyledDeleteBtn';
import StyledGallery from '../../core/components/styles/StyledGallery';
import StyledGalleryWrapper from '../../core/components/styles/StyledGalleryWrapper';
import StyledTitle from '../../core/components/styles/StyledTitle';
import RoutesConst from '../../core/helpers/constants/routesConst';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { AppState } from '../../core/interfaces';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);
  const imagesProfData = useSelector((state: AppState) => state.images.imagesProfData);
  const id = useSelector((state: AppState) => state.images.deleteWithID);
  const imgUrl = useSelector((state: AppState) => state.images.deleteWithURL);

  const delUserImageFromDB = () => dispatch(delUserImageFromDbAction(id, userID, imgUrl, userName));

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserNameAction());
    dispatch(getUserIDAction());
    dispatch(getUserImagesFromDbAction(userID, userName));
    setIsLoading(false);
  }, [dispatch, userID, userName]);

  return (
    <StyledContainer style={{ marginTop: 0 }}>
      <NavLink to={RoutesConst.HOME}>
        <StyledButton type="submit">
          Home
        </StyledButton>
      </NavLink>
      <StyledContainer style={{ marginTop: 0 }}>
        <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
        <StyledTitle style={{ fontSize: '28px', marginBottom: '10px' }}>
          {userName && getNameFromEmail(userName)}
        </StyledTitle>
      </StyledContainer>
      <StyledGalleryWrapper>
        {isLoading && <Spinner />}
        <CanvasWrapper>
          {
          imagesProfData.map((image: { id: string, imgUrl: string }, key: number) => (
            <StyledGallery key={+key}>
              <img src={image.imgUrl} alt={image.imgUrl} />
              <StyledDeleteBtn onClick={delUserImageFromDB}>x</StyledDeleteBtn>
            </StyledGallery>
          ))
          }
        </CanvasWrapper>
      </StyledGalleryWrapper>
    </StyledContainer>
  );
};

export default ProfilePage;
