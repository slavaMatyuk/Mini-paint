import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllImagesFromDbAction, sortImagesAction,
} from '../../core/actions/imageContainerActions';
import Input from '../../core/components/Input';
import Spinner from '../../core/components/Spinner';
import CanvasWrapper from '../../core/components/styles/CanvasWrapper';
import StyledAvatar from '../../core/components/styles/StyledAvatar';
import StyledButton from '../../core/components/styles/StyledButton';
import StyledContainer from '../../core/components/styles/StyledContainer';
import StyledForm from '../../core/components/styles/StyledForm';
import StyledGallery from '../../core/components/styles/StyledGallery';
import RoutesConst from '../../core/helpers/constants/routesConst';
import handleSortImages from '../../core/helpers/handleSortImages';
import { AppState } from '../../core/interfaces';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const imagesData = useSelector((state: AppState) => state.images.imagesProfData);

  const sortImagesData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    return dispatch(sortImagesAction(handleSortImages(imagesData, e.target.value)));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllImagesFromDbAction());
    setIsLoading(false);
  }, [dispatch]);

  return (
    <StyledContainer style={{ marginTop: '40px' }}>
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
          placeholder="Enter name"
          value={inputValue}
          className=""
          label="Enter user"
        />
      </StyledForm>
      {isLoading && <Spinner />}
      {
        imagesData.map((elem: { userName: string, images: [] }, key) => {
          if (elem.images) {
            return (
              <div key={+key}>
                <div>
                  <StyledAvatar>{elem.userName.substring(0, 1).toUpperCase()}</StyledAvatar>
                  <h3>{elem.userName}</h3>
                </div>
                <div>
                  {
                    elem.images.map((image: { id: string, imgUrl: string, userName: string }, key2: number) => (
                      <CanvasWrapper key={+key2}>
                        <StyledGallery>
                          <img src={image.imgUrl} alt={image.imgUrl} />
                        </StyledGallery>
                      </CanvasWrapper>
                    ))
                  }
                </div>
              </div>
            );
          }
          return null;
        })
      }
    </StyledContainer>
  );
};

export default HomePage;
