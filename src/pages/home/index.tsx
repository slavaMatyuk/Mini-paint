import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllImagesFromDbAction, sortImagesAction,
} from '../../core/actions/imageContainerActions';
import StyledGallery from '../../core/components/Canvas/styles/StyledGallery';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import Input from '../../core/components/Input';
import Spinner from '../../core/components/Spinner';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledFlexRow from '../../core/components/styles/common/StyledFlexRow';
import StyledForm from '../../core/components/styles/forms/StyledForm';
import RoutesConst from '../../core/constants/routesConst';
import sortImages from '../../core/helpers/sortImages';
import { AppState } from '../../core/interfaces';
import StyledGalleryTitle from './styles/StyledGalleryTitle';
import StyledHomeImagesWrap from './styles/StyledHomeImagesWrap';
import StyledHomeWrapper from './styles/StyledHomeWrapper';
import TransparentWrapper from './styles/TransparentWrapper';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const imagesData = useSelector((state: AppState) => state.images.imagesProfData);

  const sortImagesData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    return dispatch(sortImagesAction(sortImages(imagesData, e.target.value)));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllImagesFromDbAction());
    setIsLoading(false);
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
      <StyledForm>
        <Input
          type="text"
          onChange={sortImagesData}
          name="email"
          placeholder=""
          value={inputValue}
          className=""
          label="Enter user"
        />
      </StyledForm>
      <StyledGalleryWrapper>
        {isLoading && <Spinner />}
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
