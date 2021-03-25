import { useState } from 'react';
import indexedDB  from 'fake-indexeddb';

export const useIndexDB = () => {

  const [ data, setData ] = useState([]);
  let database, objectStore;

  //1) SAVE INTO DB
  const add = (value) => new Promise((resolve, reject) => {
    const transaction = database.transaction(['todos'], 'readwrite');
    const objectStore = transaction.objectStore('todos');
    let todo = { id:  `data-${data.length}`, description: value };
    const request = objectStore.add(todo);

    transaction.onerror = (err) => {
      reject(err)
    }

    transaction.oncomplete = (e) => {
      let tempData = [ ...data, {id: `data-${data.length}`, description: value} ];
      setData(tempData);
      resolve()
    }
  })

  //2) RETRIEVE FROM DB
  const getAll = () => new Promise((resolve, reject) => {
    let tempData = [];
    const transaction = database.transaction(['todos'], 'readonly');
    const objectStore = transaction.objectStore('todos');
    const request = objectStore.openCursor();

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if(cursor){
        tempData.push({
          id: cursor.value.id,
          description: cursor.value.description
        });
        cursor.continue();
      }else{
        setData(tempData);
        resolve(tempData);
      }
    }

    request.onerror = (err) => {
      reject(err);
    }
  });

  //3) REMOVE FROM DB
  const remove = (key) => new Promise((resolve, reject) => {
    const transaction = database.transaction(['todos'], 'readwrite');
    const objectStore = transaction.objectStore('todos');
    const request = objectStore.delete(key);

    transaction.onerror = (err) => {
      reject(err)
    }

    transaction.oncomplete = (e) => {
      resolve();
    }
  });

  //4) GET FROM DB
  const get = (key) => new Promise((resolve, reject) => {
    const transaction = database.transaction(['todos'], 'readonly');
    const objectStore = transaction.objectStore('todos');
    const request = objectStore.get(key);

    request.onerror = (event) => {
      reject();
    }

    request.onsuccess = (event) => {
      resolve(request.result);
    }
  });

  const init = () => new Promise((resolve) => {
    const request = indexedDB.open('database', 1);
    
    request.onerror = () => console.error("ERROR", request.error);
    
    request.onupgradeneeded = (event) => {
      database = event.target.result;
      objectStore = database.createObjectStore("todos", {keyPath: "description"});
    };
    
    request.onsuccess = (event) => {
      database = event.target.result;
      database.add = add;
      database.getAll = getAll;
      database.get = get;
      database.remove = remove;
      resolve(database);
    };
  });

  return { init, data }

};