import { renderHook, act } from '@testing-library/react-hooks'
import { useIndexDB } from './useIndexDB';


describe('useIndexDB', () => {

  const { result } = renderHook(() => useIndexDB())

  it('data starts empty', async () => {
    try{
      let database;
      database = await result.current.init();
      expect(result.current.data.length).toBe(0);
    }catch(error){
      console.log("ERROR: ", error);
    }
  });

  it('saves data into indexedDB', async () => {
    try{
      let database;
      let tasks;
      database = await result.current.init();
      await act( async() => { 
        await database.add('Walk the dog')
      });
      await act( async() => { 
        await database.add('Feed the cat')
      });
      await act( async() => { 
        await database.add('Buy food')
      });
      await act( async() => { 
        tasks = await database.getAll() 
      });
      expect(tasks.length).toBe(3);
    }catch(error){
      console.log("ERROR: ", error);
    }
  });

  it('gets data from indexedDB', async () => {
    let database;
    let task;
    database = await result.current.init();
    await act( async() => { 
      await database.add('Task 1')
    });
    await act( async() => { 
      task = await database.get('Task 1') 
    });
    expect(task.description).toBe('Task 1');
  });

  it('removes data from indexedDB', async () => {
    let database;
    let tasks;
    database = await result.current.init();
    await act( async() => { 
      tasks = await database.getAll() 
    });
    expect(tasks.length).toBe(4);
    await act( async() => { 
      await database.remove('Walk the dog') 
    });
    await act( async() => { 
      tasks = await database.getAll() 
    });
    expect(tasks.length).toBe(3);
  });

});