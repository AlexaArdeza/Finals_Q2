import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos, loading } = useTodos();

  if (loading) return <p>Loading todos...</p>;
  if (todos.length === 0) return <p>No todos yet! Add one above.</p>;

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        // BUG FIX: Use todo.id as key, NOT index
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
