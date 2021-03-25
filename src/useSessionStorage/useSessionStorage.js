import { useState, useEffect } from 'react';

export const useSessionStorage = () => {

  const [ data, setData ] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const saveIntoSessionStorage = (value) => {
    window.sessionStorage.setItem(`data-${data.length}`, value);
    let tempData = [ ...data, {id: `data-${data.length}`, description: value} ];
    setData(tempData);
  };

  const removeFromSessionStorage = (index, todo) => {
    window.sessionStorage.removeItem(todo.id);
    let tempData = [...data];
    tempData.splice(index, 1);
    setData(tempData);
  }

  const loadData = () => {
    let tempData = [];
    for (const key in window.sessionStorage) {
      if(key.includes('data'))
        tempData.push({
          id: key,
          description: window.sessionStorage[key]
        });
        setData(tempData);
    }
  };

  return {
    data,
    saveIntoSessionStorage,
    removeFromSessionStorage
  }

};