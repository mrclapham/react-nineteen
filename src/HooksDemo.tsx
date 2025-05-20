import { useState, useEffect, useCallback, useRef } from 'react';

// Mock implementation of React 19's useEvent hook
function useEvent(callback) {
  const callbackRef = useRef(callback);
  
  // Update ref value when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  // Return a stable function
  return useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

// Mock implementation of React 19's useSignal hook
function useSignal(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  return {
    get value() {
      return value;
    },
    set value(newValue) {
      setValue(newValue);
    }
  };
}

// Mock implementation of React 19's useOptimistic hook
function useOptimistic(state, updateFn) {
  const [optimisticState, setOptimisticState] = useState(state);
  const [pendingUpdates, setPendingUpdates] = useState([]);
  
  // Update optimistic state when actual state changes
  useEffect(() => {
    if (pendingUpdates.length === 0) {
      setOptimisticState(state);
    } else {
      // Apply all pending updates to the new state
      let result = state;
      pendingUpdates.forEach(update => {
        result = updateFn(result, update);
      });
      setOptimisticState(result);
    }
  }, [state, pendingUpdates, updateFn]);
  
  const addOptimisticUpdate = useCallback((update) => {
    setPendingUpdates(prev => [...prev, update]);
    setOptimisticState(current => updateFn(current, update));
    
    // In a real implementation, this would be tied to the actual state update
    // For demo purposes, we'll remove the update after a delay
    setTimeout(() => {
      setPendingUpdates(prev => prev.filter(u => u !== update));
    }, 1000);
  }, [updateFn]);
  
  return [optimisticState, addOptimisticUpdate];
}

export default function HooksDemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Try new hooks', completed: false },
    { id: 3, text: 'Build something awesome', completed: false }
  ]);
  
  // useSignal is a new hook in React 19 for reactive state management
  const counterSignal = useSignal(0);
  
  // useEvent is a new hook in React 19 that creates stable event handlers
  const incrementCounter = useEvent(() => {
    setCount(c => c + 1);
    counterSignal.value += 1;
  });
  
  // useOptimistic is a new hook in React 19 for optimistic UI updates
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );
  
  const addTodo = async (text) => {
    // Create an optimistic todo
    const optimisticTodo = {
      id: Date.now(),
      text,
      completed: false,
      optimistic: true
    };
    
    // Add it optimistically
    addOptimisticTodo(optimisticTodo);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update with "real" todo from server
    setTodos(current => [
      ...current,
      { ...optimisticTodo, optimistic: false }
    ]);
  };
  
  const [newTodoText, setNewTodoText] = useState('');
  
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };
  
  return (
    <div className="feature-demo">
      <h1>Enhanced Hooks in React 19</h1>
      
      <div className="demo-section">
        <h2>useEvent Hook</h2>
        <p>
          The useEvent hook creates stable event handlers that don't change 
          between renders, eliminating the need for useCallback in many cases.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <p>Count: {count}</p>
          <button 
            onClick={incrementCounter}
            style={{ padding: '0.5rem 1rem' }}
          >
            Increment with useEvent
          </button>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>useSignal Hook</h2>
        <p>
          The useSignal hook provides a reactive state primitive similar to signals 
          in other frameworks, offering more granular updates.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <p>Signal Value: {counterSignal.value}</p>
          <button 
            onClick={() => { counterSignal.value += 1; }}
            style={{ padding: '0.5rem 1rem' }}
          >
            Increment Signal
          </button>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>useOptimistic Hook</h2>
        <p>
          The useOptimistic hook enables optimistic UI updates, showing changes 
          immediately while waiting for server confirmation.
        </p>
        
        <form onSubmit={handleAddTodo} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo"
            style={{ padding: '0.5rem', marginRight: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Add Todo
          </button>
        </form>
        
        <ul style={{ marginTop: '1rem' }}>
          {optimisticTodos.map(todo => (
            <li 
              key={todo.id}
              style={{ 
                padding: '0.5rem',
                opacity: todo.optimistic ? 0.7 : 1,
                fontStyle: todo.optimistic ? 'italic' : 'normal'
              }}
            >
              {todo.text}
              {todo.optimistic && ' (saving...)'}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="demo-section">
        <h2>Key Hook Improvements in React 19</h2>
        <ul>
          <li><code>useEvent</code> - Stable event handlers without unnecessary rerenders</li>
          <li><code>useSignal</code> - Fine-grained reactive state management</li>
          <li><code>useOptimistic</code> - Optimistic UI updates for better UX</li>
          <li>Performance optimizations for existing hooks</li>
          <li>Better TypeScript integration and type inference</li>
        </ul>
      </div>
    </div>
  );
}