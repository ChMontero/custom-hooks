import './App.css';
import { Todo } from './Todo';
import { useRef, useEffect } from 'react';
import { useIndexDB } from './useIndexDB';

const App = () => {

  let database;
  const taskInput = useRef();
  const { init, data } = useIndexDB();
  
  useEffect( () => {
    console.log("USEEFFECT");
    console.log("INIT: ", init);
    const initialise = async () => {
      database = await init();
    }
    initialise();
  }, [init])

  const add = async (value) => {
    await database.add(value);
  }

  const remove = async (index, todo) => {
    await database.remove(todo.description);
  }

  return (
    <div className="app-container">
      <h1 className="title">Custom Hooks</h1>
      <div className="input-section">
        <input type="text" ref={taskInput} placeholder="New Task..." />
        <div className="add-button" onClick={() => add(taskInput.current.value)}>Add</div>
      </div>
      <div className="todos-container" >
        {
          (data.length <= 0) ? (<h2 className="empty-list" >There are no todos...</h2>) : 
          (
            data.map(( todo, index ) => <Todo key={todo.id} todo={todo} index={index} handle={remove} />)
          )
        }
      </div>
    </div>
  );
}

export default App;
