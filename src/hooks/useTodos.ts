import { useTodoContext } from '../context/TodoContext';

export const useTodos = () => {
  const context = useTodoContext();

  return {
    todos: context.todos,
    loading: context.loading,
    canAddMore: context.canAddMore,
    addTodo: context.addTodo,
    updateTodo: context.updateTodo,
    deleteTodo: context.deleteTodo,
    refresh: context.fetchTodos
  };
};
