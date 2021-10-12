import React, { useEffect, useState } from 'react';
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

const HomePage: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState('All');
  const dispatch = useDispatch();
  const images = useSelector((state: any) => state.images.images);
  const error = useSelector((state: any) => state.auth.error);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchImages());
    setIsLoading(false);
  }, [dispatch]);

  const usersArray: any = ['All'];
  images.forEach((image: any) => {
    if (!usersArray.includes(image.userEmail)) {
      usersArray.push(image.userEmail);
    }
  });

  const filteredImages = artist === 'All' ? images : images.filter((image: any) => image.userEmail === artist);

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
            <StyledSelect value={artist} onChange={(e: any) => setArtist(e.target.value)}>
              {usersArray.map((user: any) => (
                <StyledOption key={user} value={user}>
                  {user}
                </StyledOption>
              ))}
            </StyledSelect>
          </div>
          <div>
            {images && images.length > 0 ? (
              filteredImages.map((image: any) => <ImageContainer alt={image} image={image} key={image.imageId} />)
            ) : (
              <h1>No any pictures</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default HomePage;
