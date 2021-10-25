import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  delUserImageFromDbAction,
  getUserIDAction,
  getUserImagesFromDbAction,
  getUserNameAction,
} from '../../core/actions/imageContainerActions';
import Spinner from '../../core/components/Spinner';
import StyledAvatar from '../../core/components/styles/StyledAvatar';
import StyledButton from '../../core/components/styles/StyledButton';
import StyledContainer from '../../core/components/styles/StyledContainer';
import StyledTitle from '../../core/components/styles/StyledTitle';
import RoutesConst from '../../core/helpers/constants/routesConst';
import getNameFromEmail from '../../core/helpers/getNameFromEmail';
import { AppState } from '../../core/interfaces';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userName = useSelector((state: AppState) => state.auth.userName);
  const userID = useSelector((state: AppState) => state.auth.userID);
  const images = useSelector((state: AppState) => state.images.imagesData);
  const id = useSelector((state: AppState) => state.images.deleteWithID);
  const imgUrl = useSelector((state: AppState) => state.images.deleteWithURL);

  const delUserImageFromDB = () => dispatch(delUserImageFromDbAction(id, userID, imgUrl, userName));

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserNameAction());
    dispatch(getUserIDAction());
    dispatch(getUserImagesFromDbAction(userID, userName));
    setIsLoading(false);
  }, [dispatch, userID, userName]);

  console.log(`IMAGES: ${images}`);

  return (
    <StyledContainer style={{ marginTop: '20px' }}>
      <NavLink to={RoutesConst.HOME}>
        <StyledButton type="submit">
          Home
        </StyledButton>
      </NavLink>
      <StyledContainer style={{ marginTop: '20px' }}>
        <StyledAvatar>{userName && userName.substring(0, 1).toUpperCase()}</StyledAvatar>
        <StyledTitle style={{ fontSize: '28px' }}>{userName && getNameFromEmail(userName)}</StyledTitle>
      </StyledContainer>
      <div>
        {isLoading && <Spinner />}
        {
          images.map((image: { id: string, imgUrl: string }, key: number) => (
            <div key={+key}>
              <div>
                <img src={image.imgUrl} alt={image.imgUrl} />
              </div>
              <div>
                <button type="button" onClick={delUserImageFromDB}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </StyledContainer>
  );
};

export default ProfilePage;
