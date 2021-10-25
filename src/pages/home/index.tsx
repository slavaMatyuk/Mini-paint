import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getAllImagesFromDbAction, sortImagesAction } from '../../core/actions/imageContainerActions';
import Input from '../../core/components/Input';
import StyledAvatar from '../../core/components/styles/StyledAvatar';
import StyledButton from '../../core/components/styles/StyledButton';
import StyledContainer from '../../core/components/styles/StyledContainer';
import StyledForm from '../../core/components/styles/StyledForm';
import checkObject from '../../core/helpers/checkObject';
import RoutesConst from '../../core/helpers/constants/routesConst';
import handleSortImages from '../../core/helpers/handleSortImages';
import notify from '../../core/helpers/notify';
import { AppState } from '../../core/interfaces';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const sortedImagesData = useSelector((state: AppState) => state.images.sortedImagesData);
  const imagesData = useSelector((state: AppState) => state.images.imagesData);
  const error = useSelector((state: AppState) => state.auth.errorMessage);

  const sortImagesData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    return dispatch(sortImagesAction(handleSortImages(imagesData, e.target.value)));
  };

  useEffect(() => {
    dispatch(getAllImagesFromDbAction());
    if (error) {
      notify(`${error}`);
    }
  }, [dispatch, error]);

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
      {
        (checkObject(sortedImagesData)
          ? imagesData
          : sortedImagesData).map((elem: { userName: string, images: [] }, key) => {
          if (elem.images.length) {
            return (
              <div key={+key}>
                <div>
                  <StyledAvatar>{elem.userName.substring(0, 1).toUpperCase()}</StyledAvatar>
                  <h3>{elem.userName}</h3>
                </div>
                <div>
                  {
                    elem.images.map((images: { imgUrl: string }, keyImg) => (
                      <div key={+keyImg}>
                        <img src={images.imgUrl} alt={images.imgUrl} />
                      </div>
                    ))
                  }
                </div>
              </div>
            );
          }
          return 'No collections yet!';
        })
      }
    </StyledContainer>
  );
};

export default HomePage;
