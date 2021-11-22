import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { GoSearch } from 'react-icons/go';
import {
  getAllImagesFromDbAction, sortImagesAction,
} from '../../core/actions/imageContainerActions';
import AutoCompleteInput from '../../core/components/AutoCompleteInput';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import Carousel from '../../core/components/Carousel';
import RoutesConst from '../../core/constants/routesConst';
import playSound, { playDefaultButton } from '../../core/helpers/playSound';
import sortImages from '../../core/helpers/sortImages';
import { AppState } from '../../core/interfaces';
import StyledButton from '../../core/styles/buttons/StyledButton';
import StyledFlexRow from '../../core/styles/common/StyledFlexRow';
import StyledFlexRowWrap from './styles/StyledFlexRowWrap';
import StyledGalleryTitle from './styles/StyledGalleryTitle';
import StyledHomeImagesWrap from './styles/StyledHomeImagesWrap';
import StyledHomeWrapper from './styles/StyledHomeWrapper';
import StyledInputWrapper from './styles/StyledInputWrapper';
import StyledSearchButton from './styles/StyledSearchButton';
import TransparentWrapper from './styles/TransparentWrapper';
import soundsConst from '../../core/constants/soundConst';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const imagesData = useSelector((state: AppState) => state.images.imagesProfData);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const ref = React.createRef<HTMLInputElement>();

  const handleSortClick = () => {
    if (ref.current?.value === '') {
      dispatch(getAllImagesFromDbAction());
    } else {
      dispatch(sortImagesAction(sortImages(imagesData, ref.current!.value)));
      playSound(soundsConst.SEARCH);
    }
  };

  useEffect(() => {
    const getUsersInDB = () => {
      const data = imagesData.map((it: { userName: string; }) => it.userName);
      setSuggestions(data);
    };
    getUsersInDB();
  }, [imagesData]);

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
        <AutoCompleteInput suggestions={suggestions} ref={ref} />
        <StyledSearchButton type="button" onClick={handleSortClick}>
          <GoSearch size={15} />
        </StyledSearchButton>
      </StyledInputWrapper>
      <StyledGalleryWrapper>
        <TransparentWrapper>
          {
            imagesData.map((elem: { userName: string, images: [] }) => ((elem.images && elem.images.length)
              ? (
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
              ) : null))
          }
        </TransparentWrapper>
      </StyledGalleryWrapper>
    </StyledHomeWrapper>
  );
};

export default HomePage;
