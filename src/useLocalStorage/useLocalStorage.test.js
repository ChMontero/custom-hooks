import {renderHook, act} from '@testing-library/react-hooks'
import { useLocalStorage } from './useLocalStorage';
import LocalStorageComponent from './LocalStorageComponent';
import { render, fireEvent, getByTestId } from '@testing-library/react';

describe('useLocalStorage', () => {

  it('data starts empty', () => {
    const { container } = render(<LocalStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    expect(todosList.textContent).toBe("There are no todos...");
  });

  it('saves a task into localStorage', () => {
    const { container } = render(<LocalStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    const taskInput = getByTestId(container, 'task-input');
    const addButton = getByTestId(container, 'add-button');
    fireEvent.change(taskInput, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    expect(todosList.textContent).toBe("Task 1DELETE");
    expect(window.localStorage.getItem("data-0")).toBe("Task 1");
  });

  it('removes a task from localstorage', () => {
    const { container } = render(<LocalStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    expect(todosList.textContent).toBe("Task 1DELETE");
    expect(window.localStorage.getItem("data-0")).toBe("Task 1");
    const deleteButton = getByTestId(container, 'delete-button');
    fireEvent.click(deleteButton);
    expect(window.localStorage.getItem("data-0")).toBeNull();
  });

  it('saves tasks into localStorage', () => {
    const { container } = render(<LocalStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    const taskInput = getByTestId(container, 'task-input');
    const addButton = getByTestId(container, 'add-button');
    fireEvent.change(taskInput, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    fireEvent.change(taskInput, { target: { value: "Task 2" } });
    fireEvent.click(addButton);
    fireEvent.change(taskInput, { target: { value: "Task 3" } });
    fireEvent.click(addButton);
    expect(todosList.children.length).toBe(3);
  });

  it('loads tasks from localStorage', () => {
    const { container } = render(<LocalStorageComponent />);
    const todosList = getByTestId(container, 'todos-container');
    expect(todosList.children.length).toBe(3);
  });

});