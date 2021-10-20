import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../core/actions/imageContainerActions';
import ImageContainer from '../../core/components/ImageContainer';
import Spinner from '../../core/components/Spinner';
import StyledButton from '../../core/components/styles/StyledButton';
import StyledContainer from '../../core/components/styles/StyledContainer';
import StyledOption from '../../core/components/styles/StyledOption';
import StyledSelect from '../../core/components/styles/StyledSelect';
import StyledTitle from '../../core/components/styles/StyledTitle';
import RoutesConst from '../../core/helpers/constants/routesConst';
import notify from '../../core/helpers/notify';
import { ImageType, RootStateType } from '../../core/interfaces';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [painter, setPainter] = useState('All painters');
  const dispatch = useDispatch();
  const images = useSelector((state: RootStateType) => state.images.images);
  const usersArray: Array<string> = ['All painters'];

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchImages());
    setIsLoading(false);
    if (!images.length) {
      notify('There are no pictures yet');
    }
  }, [dispatch, images.length]);

  images.forEach((image: ImageType) => {
    if (!usersArray.includes(image.userEmail)) {
      usersArray.push(image.userEmail);
    }
  });

  const filteredImages = painter === 'All painters'
    ? images : images.filter((image: ImageType) => image.userEmail === painter);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
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
          <StyledSelect
            value={painter}
            onChange={(e: ChangeEvent<{ value: unknown }>) => setPainter(e.target.value as string)}
            style={{ width: '120px', margin: 0 }}
          >
            {usersArray.map((user: string) => (
              <StyledOption key={user} value={user}>
                {user}
              </StyledOption>
            ))}
          </StyledSelect>
          <div>
            {images && images.length > 0 ? (
              filteredImages.map((image: ImageType) => <ImageContainer image={image} key={image.imageId} />)
            ) : (
              <StyledTitle>No any pictures</StyledTitle>
            )}
          </div>
        </StyledContainer>
      )}
    </div>
  );
};

export default HomePage;
