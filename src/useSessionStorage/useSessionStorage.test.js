import SessionStorageComponent from './SessionStorageComponent';
import { render, fireEvent, getByTestId } from '@testing-library/react';

describe('useSessionStorage', () => {

  it('data starts empty', () => {
    const { container } = render(<SessionStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    expect(todosList.textContent).toBe("There are no todos...");
  });

  it('saves a task into sessionStorage', () => {
    const { container } = render(<SessionStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    const taskInput = getByTestId(container, 'task-input');
    const addButton = getByTestId(container, 'add-button');
    fireEvent.change(taskInput, { target: { value: "Learn react" } });
    fireEvent.click(addButton);
    expect(todosList.textContent).toBe("Learn reactDELETE");
    expect(window.sessionStorage.getItem("data-0")).toBe("Learn react");
  });

  it('removes a task from sessionStorage', () => {
    const { container } = render(<SessionStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    expect(todosList.textContent).toBe("Learn reactDELETE");
    expect(window.sessionStorage.getItem("data-0")).toBe("Learn react");
    const deleteButton = getByTestId(container, 'delete-button');
    fireEvent.click(deleteButton);
    expect(window.sessionStorage.getItem("data-0")).toBeNull();
  });

  it('saves tasks into sessionStorage', () => {
    const { container } = render(<SessionStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    const taskInput = getByTestId(container, 'task-input');
    const addButton = getByTestId(container, 'add-button');
    fireEvent.change(taskInput, { target: { value: "Learn React" } });
    fireEvent.click(addButton);
    fireEvent.change(taskInput, { target: { value: "Learn Vue" } });
    fireEvent.click(addButton);
    expect(todosList.children.length).toBe(2);
  });

  it('loads tasks from sessionStorage', () => {
    const { container } = render(<SessionStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    expect(todosList.children.length).toBe(2);
  });

});