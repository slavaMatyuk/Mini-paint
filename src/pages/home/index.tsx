import React, {
  useCallback, useEffect, useRef, useState, KeyboardEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllImagesFromDbAction, sortImagesAction,
} from '../../core/actions/imageContainerActions';
import StyledGallery from '../../core/components/Canvas/styles/StyledGallery';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledFlexRow from '../../core/components/styles/common/StyledFlexRow';
import RoutesConst from '../../core/constants/routesConst';
import sortImages from '../../core/helpers/sortImages';
import { AppState } from '../../core/interfaces';
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
      <NavLink to={RoutesConst.PROFILE}>
        <StyledButton type="submit">
          Profile
        </StyledButton>
      </NavLink>
      <NavLink to={RoutesConst.EDITOR}>
        <StyledButton type="submit">
          Editor
        </StyledButton>
      </NavLink>
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
            imagesData.map((elem: { userName: string, images: [] }, key) => {
              if (elem.images && elem.images.length) {
                return (
                  <div key={+key}>
                    <StyledFlexRow>
                      <StyledGalleryTitle>{elem.userName}</StyledGalleryTitle>
                    </StyledFlexRow>
                    {
                      elem.images.map((image: { id: string, imgUrl: string, userName: string }, key2: number) => (
                        <StyledHomeImagesWrap key={+key2}>
                          <StyledGallery>
                            <img src={image.imgUrl} alt={image.imgUrl} />
                          </StyledGallery>
                        </StyledHomeImagesWrap>
                      ))
                    }
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
