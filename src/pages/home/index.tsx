import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../core/actions/imageContainerActions';
import ImageContainer from '../../core/components/ImageContainer';
import Spinner from '../../core/components/Spinner';
import StyledOption from '../../core/configs/styles/StyledOption';
import StyledSelect from '../../core/configs/styles/StyledSelect';
import routesConst from '../../core/helpers/constants/routesConst';
import { ImageType, RootStateType } from '../../core/interfaces';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [painter, setPainter] = useState('All painters');
  const dispatch = useDispatch();
  const images = useSelector((state: RootStateType) => state.images.images);
  const error = useSelector((state: RootStateType) => state.auth.error);
  const usersArray: Array<string> = ['All painters'];

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchImages());
    setIsLoading(false);
  }, [dispatch]);

  images.forEach((image: ImageType) => {
    if (!usersArray.includes(image.userEmail)) {
      usersArray.push(image.userEmail);
    }
  });

  const filteredImages = painter === 'All painters' ? images : images.filter((image: ImageType) => image.userEmail === painter);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {error ? toast('Auth Error', { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT }) : ''}
          <div>
            <button type="submit">
              <NavLink to={routesConst.HOME}>Feed</NavLink>
            </button>
            <button type="submit">
              <NavLink to={routesConst.EDITOR}>Editor</NavLink>
            </button>
            <StyledSelect value={painter} onChange={(e: ChangeEvent<{ value: unknown }>) => setPainter(e.target.value as string)}>
              {usersArray.map((user: string) => (
                <StyledOption key={user} value={user}>
                  {user}
                </StyledOption>
              ))}
            </StyledSelect>
          </div>
          <div>
            {images && images.length > 0 ? (
              filteredImages.map((image: ImageType) => <ImageContainer image={image} key={image.imageId} />)
            ) : (
              <h1>No any pictures</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
