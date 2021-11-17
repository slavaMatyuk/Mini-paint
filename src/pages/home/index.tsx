import React, {
  useCallback, useEffect, useRef, useState, KeyboardEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllImagesFromDbAction, sortImagesAction,
} from '../../core/actions/imageContainerActions';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import Carousel from '../../core/components/Carousel';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledFlexRow from '../../core/components/styles/common/StyledFlexRow';
import RoutesConst from '../../core/constants/routesConst';
import soundsConst from '../../core/constants/soundConst';
import playSound, { playDefaultButton } from '../../core/helpers/playSound';
import sortImages from '../../core/helpers/sortImages';
import { AppState } from '../../core/interfaces';
import StyledFlexRowWrap from './styles/StyledFlexRowWrap';
import StyledGalleryTitle from './styles/StyledGalleryTitle';
import StyledHomeImagesWrap from './styles/StyledHomeImagesWrap';
import StyledHomeWrapper from './styles/StyledHomeWrapper';
import StyledInputWrapper from './styles/StyledInputWrapper';
import TransparentWrapper from './styles/TransparentWrapper';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const imagesData = useSelector((state: AppState) => state.images.imagesProfData);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    playSound(soundsConst.KEY);
  }, []);

  const handleEnterClick = useCallback(async () => {
    if (!inputValue) {
      await dispatch(getAllImagesFromDbAction());
    } else {
      await dispatch(sortImagesAction(sortImages(imagesData, inputValue)));
    }
  }, [inputValue, imagesData, dispatch]);

  const onKeyDownHandler = useCallback(async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') await handleEnterClick();
  }, [handleEnterClick]);

  useEffect(() => {
    dispatch(getAllImagesFromDbAction());
  }, [dispatch]);

  return (
    <StyledHomeWrapper>
      <StyledFlexRowWrap>
        <NavLink to={RoutesConst.PROFILE}>
          <StyledButton type="submit" onClick={playDefaultButton}>
            Profile
          </StyledButton>
        </NavLink>
        <NavLink to={RoutesConst.EDITOR}>
          <StyledButton type="submit" onClick={playDefaultButton}>
            Editor
          </StyledButton>
        </NavLink>
      </StyledFlexRowWrap>
      <StyledInputWrapper>
        <label htmlFor="search">
          Enter user
          <input
            ref={inputRef}
            type="text"
            id="search"
            name="search"
            placeholder="and push Enter to sort"
            onChange={handleInputChange}
            onKeyDown={onKeyDownHandler}
            value={inputValue}
          />
        </label>
      </StyledInputWrapper>
      <StyledGalleryWrapper>
        <TransparentWrapper>
          {
            imagesData.map((elem: { userName: string, images: [] }) => {
              if (elem.images && elem.images.length) {
                return (
                  <div key={elem.userName}>
                    <StyledFlexRow>
                      <StyledGalleryTitle>{elem.userName}</StyledGalleryTitle>
                    </StyledFlexRow>
                    <Carousel>
                      {
                      elem.images.map((image: { id: string, imgUrl: string, userName: string }) => (
                        <StyledHomeImagesWrap key={image.id}>
                          <img src={image.imgUrl} alt={image.imgUrl} />
                        </StyledHomeImagesWrap>
                      ))
                    }
                    </Carousel>
                  </div>
                );
              }
              return null;
            })
          }
        </TransparentWrapper>
      </StyledGalleryWrapper>
    </StyledHomeWrapper>
  );
};

export default HomePage;
