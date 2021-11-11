import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  delTriggerAction,
  delUserImageFromDbAction,
  getUserIDAction,
  getUserImagesFromDbAction,
  getUserNameAction,
} from '../../core/actions/imageContainerActions';
import StyledDeleteBtn from '../../core/components/styles/buttons/StyledDeleteBtn';
import StyledModalBg from '../../core/components/styles/modalWindow/StyledModalBg';
import RoutesConst from '../../core/constants/routesConst';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { AppState } from '../../core/interfaces';
import StyledModalWindow from '../../core/components/styles/modalWindow/StyledModalWindow';
import CanvasWrapper from '../../core/components/Canvas/styles/CanvasWrapper';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledAvatar from '../../core/components/styles/common/StyledAvatar';
import StyledFlexRow from '../../core/components/styles/common/StyledFlexRow';
import StyledProfileWrapper from './styles/StyledProfileWrapper';
import StyledGreetings from './styles/StyledGreetings';
import StyledProfileGallery from './styles/StyledProfileGallery';
import TransparentWrapper from '../home/styles/TransparentWrapper';
import StyledProfileImages from './styles/StyledProfileImages';
import { StyledModalBtnDanger, StyledModalButton } from '../../core/components/styles/modalWindow/StyledModalButton';
import notify from '../../core/helpers/notify';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);
  const imagesProfData = useSelector((state: AppState) => state.images.imagesProfData);
  const isTrigger = useSelector((state: AppState) => state.images.delTrigger);
  const id = useSelector((state: AppState) => state.images.deleteWithID);
  const imgUrl = useSelector((state: AppState) => state.images.deleteWithURL);
  const delTrigger = (id2: string | null, imgUrl2: string | null) => dispatch(delTriggerAction(id2, imgUrl2));
  const onDelTrigger = (id2: string | null, imgUrl2: string | null) => () => delTrigger(id2, imgUrl2);

  const delUserImageFromDB = () => {
    dispatch(delUserImageFromDbAction(id, userID, imgUrl, userName));
    notify('The picture has deleted');
  };

  useEffect(() => {
    dispatch(getUserNameAction());
    dispatch(getUserIDAction());
    dispatch(getUserImagesFromDbAction(userID, userName));
  }, [dispatch, userID, userName]);

  return (
    <StyledProfileWrapper>
      <NavLink to={RoutesConst.HOME}>
        <StyledButton type="submit">
          Home
        </StyledButton>
      </NavLink>
      <StyledProfileWrapper>
        <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
        <StyledGreetings>
          {userName && `Hello, ${getNameFromEmail(userName)}!`}
        </StyledGreetings>
      </StyledProfileWrapper>
      <StyledGalleryWrapper>
        <TransparentWrapper>
          {
            imagesProfData.map((image: { id: string, imgUrl: string }, key: number) => {
              if (image) {
                return (
                  <StyledProfileGallery key={+key}>
                    <CanvasWrapper>
                      <StyledProfileImages>
                        <img src={image.imgUrl} alt={image.imgUrl} />
                        <StyledDeleteBtn onClick={onDelTrigger(image.id, image.imgUrl)}>
                          ✖
                        </StyledDeleteBtn>
                      </StyledProfileImages>
                    </CanvasWrapper>
                  </StyledProfileGallery>
                );
              }
              return null;
            })
        }
        </TransparentWrapper>
        {isTrigger && (
          <StyledModalBg>
            <StyledModalWindow>
              <p>DELETE?</p>
              <StyledFlexRow>
                <StyledModalBtnDanger onClick={onDelTrigger(null, null)}>
                  ✖
                </StyledModalBtnDanger>
                <StyledModalButton onClick={delUserImageFromDB}>✓</StyledModalButton>
              </StyledFlexRow>
            </StyledModalWindow>
          </StyledModalBg>
        )}
      </StyledGalleryWrapper>
    </StyledProfileWrapper>
  );
};

export default ProfilePage;
