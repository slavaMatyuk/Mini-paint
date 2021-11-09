import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllImagesFromDbAction, sortImagesAction,
} from '../../core/actions/imageContainerActions';
import CanvasWrapper from '../../core/components/Canvas/styles/CanvasWrapper';
import StyledGallery from '../../core/components/Canvas/styles/StyledGallery';
import StyledGalleryWrapper from '../../core/components/Canvas/styles/StyledGalleryWrapper';
import Input from '../../core/components/Input';
import Spinner from '../../core/components/Spinner';
import StyledButton from '../../core/components/styles/buttons/StyledButton';
import StyledContainer from '../../core/components/styles/common/StyledContainer';
import StyledFlexRow from '../../core/components/styles/common/StyledFlexRow';
import StyledTitle from '../../core/components/styles/common/StyledTitle';
import StyledForm from '../../core/components/styles/forms/StyledForm';
import RoutesConst from '../../core/constants/routesConst';
import sortImages from '../../core/helpers/sortImages';
import { AppState } from '../../core/interfaces';

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
    <StyledContainer style={{ marginTop: 0 }}>
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
      <StyledForm style={{ marginTop: 0 }}>
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
        <CanvasWrapper style={{ background: 'transparent' }}>
          {
          imagesData.map((elem: { userName: string, images: [] }, key) => {
            if (elem.images && elem.images.length) {
              return (
                <div key={+key}>
                  <StyledFlexRow>
                    <StyledTitle style={{ fontSize: '20px', margin: '10px 0' }}>{elem.userName}</StyledTitle>
                  </StyledFlexRow>
                  {
                  elem.images.map((image: { id: string, imgUrl: string, userName: string }, key2: number) => (
                    <CanvasWrapper key={+key2} style={{ marginBottom: '40px' }}>
                      <StyledGallery>
                        <img src={image.imgUrl} alt={image.imgUrl} />
                      </StyledGallery>
                    </CanvasWrapper>
                  ))
                }
                </div>
              );
            }
            return null;
          })
        }
        </CanvasWrapper>
      </StyledGalleryWrapper>
    </StyledContainer>
  );
};

export default HomePage;
