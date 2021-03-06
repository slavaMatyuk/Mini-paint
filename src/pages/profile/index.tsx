import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  delTriggerAction,
  delUserImageFromDbAction,
  getUserIDAction,
  getUserImagesFromDbAction,
  getUserNameAction,
} from '../../core/actions/imageContainerActions';
import StyledDeleteBtn from '../../core/styles/buttons/StyledDeleteBtn';
import StyledModalBg from '../../core/styles/modalWindow/StyledModalBg';
import RoutesConst from '../../core/constants/routesConst';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { AppState } from '../../core/interfaces';
import StyledModalWindow from '../../core/styles/modalWindow/StyledModalWindow';
import CanvasWrapper from '../../core/components/Canvas/styles/CanvasWrapper';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import StyledButton from '../../core/styles/buttons/StyledButton';
import StyledFlexRow from '../../core/styles/common/StyledFlexRow';
import StyledProfileWrapper from './styles/StyledProfileWrapper';
import StyledGreetings from './styles/StyledGreetings';
import StyledProfileGallery from './styles/StyledProfileGallery';
import StyledProfileImages from './styles/StyledProfileImages';
import { StyledModalBtnDanger, StyledModalButton } from '../../core/styles/modalWindow/StyledModalButton';
import notify from '../../core/helpers/notify';
import TransparentProfWrapper from './styles/TransparentProfWrapper';
import playSound, { playDefaultButton } from '../../core/helpers/playSound';
import soundsConst from '../../core/constants/soundConst';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);
  const imagesProfData = useSelector((state: AppState) => state.images.imagesProfData);
  const isTrigger = useSelector((state: AppState) => state.images.delTrigger);
  const id = useSelector((state: AppState) => state.images.deleteWithID);
  const imgUrl = useSelector((state: AppState) => state.images.deleteWithURL);
  const delTrigger = (id2: string | null, imgUrl2: string | null) => dispatch(delTriggerAction(id2, imgUrl2));
  const onDelTrigger = (id2: string | null, imgUrl2: string | null) => () => {
    delTrigger(id2, imgUrl2);
    playSound(soundsConst.TOOL);
  };

  const delUserImageFromDB = () => {
    dispatch(delUserImageFromDbAction(id, userID, imgUrl, userName));
    notify('The picture is deleted');
  };

  useEffect(() => {
    dispatch(getUserNameAction());
    dispatch(getUserIDAction());
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(getUserImagesFromDbAction(userID, userName));
  }, [dispatch, userID, userName]);

  return (
    <StyledProfileWrapper>
      <NavLink to={RoutesConst.HOME}>
        <StyledButton type="submit" onClick={playDefaultButton}>
          Home
        </StyledButton>
      </NavLink>
      <StyledProfileWrapper>
        <StyledGreetings>
          {userName && `Hello, ${getNameFromEmail(userName)}!`}
        </StyledGreetings>
      </StyledProfileWrapper>
      <StyledGalleryWrapper>
        <TransparentProfWrapper>
          {
            imagesProfData.map((image: { id: string, imgUrl: string }, key: number) => (
              image ? (
                <StyledProfileGallery key={key.toString()}>
                  <CanvasWrapper>
                    <StyledProfileImages>
                      <img src={image.imgUrl} alt={image.imgUrl} />
                      <StyledDeleteBtn onClick={onDelTrigger(image.id, image.imgUrl)}>
                        ???
                      </StyledDeleteBtn>
                    </StyledProfileImages>
                  </CanvasWrapper>
                </StyledProfileGallery>
              ) : null
            ))
          }
        </TransparentProfWrapper>
        {isTrigger && (
          <StyledModalBg>
            <StyledModalWindow>
              <p>DELETE?</p>
              <StyledFlexRow>
                <StyledModalBtnDanger onClick={onDelTrigger(null, null)}>
                  ???
                </StyledModalBtnDanger>
                <StyledModalButton onClick={delUserImageFromDB}>???</StyledModalButton>
              </StyledFlexRow>
            </StyledModalWindow>
          </StyledModalBg>
        )}
      </StyledGalleryWrapper>
    </StyledProfileWrapper>
  );
};

export default ProfilePage;
