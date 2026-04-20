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
  const [isMining, setIsMining] = useState(false);

  const calculateSimpleHash = async (text: string, nonce: number) => {
    const msgUint8 = new TextEncoder().encode(text + nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      setIsMining(true);
      
      // Challenge B Extra Credit: Mining Activity (Proof of Work)
      let nonce = 0;
      let hash = "";
      while (true) {
        hash = await calculateSimpleHash(data.title, nonce);
        if (hash.startsWith('00')) break;
        nonce++;
        if (nonce > 10000) break; // Safety break
      }

      await addTodo(data.title);
      reset();
      setIsMining(false);
      navigate('/'); // Programmatic navigation
    } catch (error: any) {
      setSubmitError(error.message);
      setIsMining(false);
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
          <button type="submit" className="btn-primary" disabled={!canAddMore || isMining}>
            {isMining ? "Mining..." : "Quick Add"}
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
