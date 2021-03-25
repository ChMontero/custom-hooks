import '../App.css';
import { Todo } from '../Todo';
import { useRef } from 'react';
import { useSessionStorage } from './useSessionStorage';

const SessionStorageComponent = () => {

  const taskInput = useRef();
  const { data, saveIntoSessionStorage, removeFromSessionStorage } = useSessionStorage();

  return (
    <div className="app-container">
      <h1 className="title">Custom Hooks</h1>
      <div className="input-section">
        <input type="text" data-testid="task-input" ref={taskInput} placeholder="New Task..." />
        <div className="add-button" data-testid="add-button" onClick={() => saveIntoSessionStorage(taskInput.current.value)}>Add</div>
      </div>
      <div className="todos-container" data-testid="todos-container">
        {
          (data.length <= 0) ? (<h2 className="empty-list" >There are no todos...</h2>) : 
          (
            data.map(( todo, index ) => <Todo key={todo.id} todo={todo} index={index} handle={removeFromSessionStorage} />)
          )
        }
      </div>
    </div>
  );
}

export default SessionStorageComponent;
