import '../App.css';
import { Todo } from '../Todo';
import { useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

const LocalStorageComponent = () => {

  const taskInput = useRef();
  const { data, saveIntoLocalStorage, removeFromLocalStorage } = useLocalStorage();

  return (
    <div className="app-container">
      <h1 className="title">Custom Hooks</h1>
      <div className="input-section">
        <input type="text" data-testid="task-input" ref={taskInput} placeholder="New Task..." />
        <div className="add-button" data-testid="add-button" onClick={() => saveIntoLocalStorage(taskInput.current.value)}>Add</div>
      </div>
      <div className="todos-container" data-testid="todos-container">
        {
          (data.length <= 0) ? (<h2 className="empty-list" >There are no todos...</h2>) : 
          (
            data.map(( todo, index ) => <Todo key={todo.id} todo={todo} index={index} handle={removeFromLocalStorage} />)
          )
        }
      </div>
    </div>
  );
}

export default LocalStorageComponent;
