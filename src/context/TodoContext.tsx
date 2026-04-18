import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  canAddMore: boolean;
  chainValid: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  verifyIntegrity: () => Promise<boolean>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api/todos';

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [chainValid, setChainValid] = useState(true);

  // Challenge A: Max 5 active tasks
  const activeCount = todos.filter(t => !t.completed).length;
  const canAddMore = activeCount < 5;

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTodos(data.map((t: any) => ({ 
          ...t, 
          createdAt: t.createdAt ? new Date(t.createdAt).getTime() : Date.now() 
        })));
        await verifyIntegrity(); // Verify on every fetch
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyIntegrity = async () => {
    try {
      const response = await fetch(`${API_URL}/verify`);
      const isValid = response.ok;
      setChainValid(isValid);
      return isValid;
    } catch (error) {
      setChainValid(false);
      return false;
    }
  };

  const addTodo = async (title: string) => {
    if (!canAddMore) {
      throw new Error("Capacity Reached: Max 5 active tasks allowed!");
    }
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      if (response.ok) {
        const newTodo = await response.json();
        setTodos((prev) => [...prev, { 
          ...newTodo, 
          createdAt: newTodo.createdAt ? new Date(newTodo.createdAt).getTime() : Date.now() 
        }]);
        await verifyIntegrity();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    // Challenge A: Sequential Integrity (FIFO)
    if (updates.completed === true) {
      const activeTodos = todos
        .filter(t => !t.completed)
        .sort((a, b) => a.createdAt - b.createdAt);
      
      if (activeTodos.length > 0 && activeTodos[0].id !== id) {
        throw new Error("Sequential Integrity: You must complete the oldest task first!");
      }
    }

    try {
      const current = todos.find(t => t.id === id);
      if (!current) return;

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, ...updates }),
      });

      if (response.ok) {
        const updated = await response.json();
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
        await verifyIntegrity();

        // Challenge A: Shadow Archive
        if (updated.completed) {
          setTimeout(() => {
            deleteTodo(updated.id);
          }, 15000);
        }
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
        await verifyIntegrity();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, loading, canAddMore, chainValid, fetchTodos, addTodo, updateTodo, deleteTodo, verifyIntegrity }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext must be used within a TodoProvider');
  return context;
};
