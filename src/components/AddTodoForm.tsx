import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../hooks/useTodos';

interface FormData {
  title: string;
}

const AddTodoForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { addTodo, canAddMore } = useTodos();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      await addTodo(data.title);
      reset();
      navigate('/'); // Programmatic navigation
    } catch (error: any) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit(onSubmit)} className="add-todo-form glass">
        <div className="input-group">
          <input 
            {...register('title', { 
              required: 'Task title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' }
            })} 
            placeholder={canAddMore ? "Add a new task..." : "Capacity reached (Max 5)"}
            disabled={!canAddMore}
          />
          <button type="submit" className="btn-primary" disabled={!canAddMore}>
            Quick Add
          </button>
        </div>
        
        {errors.title && <span className="error">{errors.title.message}</span>}
        {(submitError || !canAddMore) && (
          <div className="capacity-warning">
            {submitError || "High-Pressure Alert: Maximum 5 active tasks reached!"}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTodoForm;
