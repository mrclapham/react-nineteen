import { useRef, useState } from 'react';

// Mock implementations of React 19 Actions API for demo purposes
// In a real app with React 19, you would import these from react-dom
const action = (fn) => fn;

function useFormStatus() {
  // Mock implementation
  return { pending: false };
}

function useActionState(actionFn, initialState) {
  const [state, setState] = useState(initialState);
  
  const formAction = async (formData) => {
    // Simulate pending state
    setState({ ...state, pending: true });
    
    try {
      // Call the action function with the form data
      const result = await actionFn(formData);
      setState(result);
    } catch (error) {
      setState({ success: false, error: error.message });
    }
  };
  
  return [state, formAction];
}

// React 19 introduces the Actions API for form handling
const submitForm = action(async (formData: FormData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const name = formData.get('name') as string;
  if (!name || name.trim() === '') {
    return { success: false, error: 'Name is required' };
  }
  
  return { 
    success: true, 
    message: `Hello, ${name}! Your form was submitted successfully.` 
  };
});

function SubmitButton() {
  // useFormStatus is a new hook in React 19 for tracking form submission state
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default function ActionsDemo() {
  // useActionState is a new hook in React 19 for accessing action results
  const [state, formAction] = useActionState(submitForm, null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    formAction(formData);
  };
  
  return (
    <div className="feature-demo">
      <h1>React 19 Actions API</h1>
      
      <div className="demo-section">
        <h2>Form Handling with Actions</h2>
        <p>
          The Actions API simplifies form handling by providing built-in 
          functionality for form submissions, loading states, and optimistic updates.
        </p>
        
        <form ref={formRef} onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
            />
          </div>
          
          <SubmitButton />
          
          {state?.success === false && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{state.error}</p>
          )}
          
          {state?.success === true && (
            <p style={{ color: 'green', marginTop: '1rem' }}>{state.message}</p>
          )}
        </form>
      </div>
      
      <div className="demo-section">
        <h2>Key Features of Actions API</h2>
        <ul>
          <li>Declarative form handling with the <code>action</code> directive</li>
          <li>Built-in loading states with <code>useFormStatus</code></li>
          <li>Access to form submission results with <code>useActionState</code></li>
          <li>Automatic form revalidation</li>
          <li>Works with both client and server components</li>
        </ul>
      </div>
    </div>
  );
}