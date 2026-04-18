import React from 'react';
import { useForm } from 'react-hook-form';
import { Todo } from '../context/TodoContext';
import { useTodos } from '../hooks/useTodos';

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
}

interface FormData {
  title: string;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { title: todo.title }
  });
  const { updateTodo } = useTodos();

  const onSubmit = async (data: FormData) => {
    try {
      await updateTodo(todo.id, { title: data.title });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <h2>Update Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input 
              {...register('title', { 
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })} 
              autoFocus
              placeholder="Enter new task title..."
            />
            {errors.title && <span className="error">{errors.title.message}</span>}
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Discard
            </button>
            <button type="submit" className="btn-primary">
              Confirm Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
