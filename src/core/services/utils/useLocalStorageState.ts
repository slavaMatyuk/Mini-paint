import {
  Dispatch, SetStateAction, useLayoutEffect, useState,
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

  useLayoutEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
