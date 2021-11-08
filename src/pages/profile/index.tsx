import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  delTriggerAction,
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
import StyledFlexRow from '../../core/components/styles/StyledFlexRow';
import StyledGallery from '../../core/components/styles/StyledGallery';
import StyledGalleryWrapper from '../../core/components/styles/StyledGalleryWrapper';
import StyledModalBg from '../../core/components/styles/StyledModalBg';
import StyledModalButton from '../../core/components/styles/StyledModalButton';
import StyledModalWindow from '../../core/components/styles/StyledModalWindow';
import StyledTitle from '../../core/components/styles/StyledTitle';
import RoutesConst from '../../core/constants/routesConst';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { AppState } from '../../core/interfaces';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);
  const imagesProfData = useSelector((state: AppState) => state.images.imagesProfData);
  const isTrigger = useSelector((state: AppState) => state.images.delTrigger);
  const id = useSelector((state: AppState) => state.images.deleteWithID);
  const imgUrl = useSelector((state: AppState) => state.images.deleteWithURL);
  const delTrigger = (id2: string | null, imgUrl2: string | null) => dispatch(delTriggerAction(id2, imgUrl2));
  const onDelTrigger = (id2: string | null, imgUrl2: string | null) => () => delTrigger(id2, imgUrl2);

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
          {userName && `Hello, ${getNameFromEmail(userName)}!`}
        </StyledTitle>
      </StyledContainer>
      <StyledGalleryWrapper>
        <CanvasWrapper>
          {isLoading && <Spinner />}
          {
        imagesProfData.map((image: { id: string, imgUrl: string }, key: number) => (
          <CanvasWrapper key={+key} style={{ marginBottom: '40px' }}>
            <StyledGallery style={{ position: 'relative', marginBottom: '40px' }}>
              <img src={image.imgUrl} alt={image.imgUrl} />
              <StyledDeleteBtn onClick={onDelTrigger(image.id, image.imgUrl)} style={{ position: 'absolute' }}>
                x
              </StyledDeleteBtn>
            </StyledGallery>
          </CanvasWrapper>
        ))
        }
        </CanvasWrapper>
        {isTrigger && (
          <StyledModalBg>
            <StyledModalWindow>
              <p>DELETE?</p>
              <StyledFlexRow>
                <StyledModalButton
                  onClick={onDelTrigger(null, null)}
                  style={{ backgroundColor: '#cc0000' }}
                >
                  ☒
                </StyledModalButton>
                <StyledModalButton onClick={delUserImageFromDB}>☑</StyledModalButton>
              </StyledFlexRow>
            </StyledModalWindow>
          </StyledModalBg>
        )}
      </StyledGalleryWrapper>
    </StyledContainer>
  );
};

export default ProfilePage;
