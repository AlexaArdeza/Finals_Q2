import React from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import { useTodoContext } from '../context/TodoContext';

const TodoPage: React.FC = () => {
  const { chainValid } = useTodoContext();

  return (
    <div className="todo-page">
      {!chainValid && (
        <div className="chain-alert glass" style={{ 
          background: 'rgba(239, 68, 68, 0.9)', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '16px', 
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 'bold',
          border: '2px solid white'
        }}>
          ⚠️ SYSTEM ALERT: DATA CHAIN TEMPERED / REDACTED
        </div>
      )}

      <h1>Task Management</h1>
      <p className="subtitle">Streamline your productivity with effortless task tracking.</p>
      
      <AddTodoForm />
      
      <div className="list-section">
        <TodoList />
      </div>
    </div>
  );
};

export default TodoPage;
