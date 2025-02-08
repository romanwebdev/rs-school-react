import { useEffect, useState } from 'react';

function useLocalStorage(key: string, defaultValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item ? item : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ];
}

export default useLocalStorage;
