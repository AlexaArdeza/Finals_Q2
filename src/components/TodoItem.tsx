import React, { useState } from 'react';
import { Todo } from '../context/TodoContext';
import { useTodos } from '../hooks/useTodos';
import EditTodoModal from './EditTodoModal';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodos();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    try {
      setError(null);
      await updateTodo(todo.id, { completed: !todo.completed });
    } catch (err: any) {
      setError(err.message);
      // Auto-clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className={`todo-item glass ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content" onClick={handleToggle}>
        <div className="checkbox">
          {todo.completed && <span style={{ color: 'white', fontSize: '0.8rem' }}>✓</span>}
        </div>
        <div className="todo-text-wrapper">
          <span className="todo-title">{todo.title}</span>
          {error && <div className="error-mini" style={{ color: 'var(--danger)', fontSize: '0.7rem', fontWeight: 'bold' }}>{error}</div>}
        </div>
      </div>
      
      <div className="todo-actions">
        {!todo.completed && (
          <button className="icon-btn edit-btn" onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true); }} title="Edit">
            ✎
          </button>
        )}
        <button className="icon-btn delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(); }} title="Delete">
          ✕
        </button>
      </div>

      {isEditModalOpen && (
        <EditTodoModal 
          todo={todo} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default TodoItem;
