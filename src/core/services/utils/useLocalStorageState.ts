import {
  useState, useEffect, SetStateAction, Dispatch,
} from 'react';

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
];

function useLocalStorageState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    console.log('сохранение темы в локал сторидж');
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
