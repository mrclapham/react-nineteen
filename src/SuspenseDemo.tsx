import { Suspense, useState, useEffect } from 'react';

// Mock implementation of React 19's use hook
function use(promise) {
  // This is a simplified mock implementation
  // In React 19, this would be a built-in hook
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    promise
      .then((result) => {
        if (isMounted) {
          setData(result);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });
    
    return () => {
      isMounted = false;
    };
  }, [promise]);
  
  if (error) throw error;
  if (!data) throw promise;
  
  return data;
}

// Simulate a data fetching function that returns a promise
function fetchData(delay = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: 'Data loaded successfully!',
        timestamp: new Date().toLocaleTimeString()
      });
    }, delay);
  });
}

// Component that uses the 'use' hook
function DataDisplay({ dataPromise }) {
  // In a real React 19 app, this would use the built-in 'use' hook
  const data = use(dataPromise);
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
      <h3>Data Loaded</h3>
      <p>{data.message}</p>
      <p>Loaded at: {data.timestamp}</p>
    </div>
  );
}

// A wrapper component to handle the suspense behavior in our mock implementation
function SuspenseWrapper({ children }) {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    try {
      setContent(children);
    } catch (promise) {
      if (promise instanceof Promise) {
        promise.then(() => {
          setContent(children);
        });
      }
    }
  }, [children]);
  
  return content;
}

export default function SuspenseDemo() {
  const [dataPromise, setDataPromise] = useState(null);
  const [loadingTime, setLoadingTime] = useState(2000);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  
  const handleLoadData = () => {
    setIsLoading(true);
    setData(null);
    
    fetchData(loadingTime).then(result => {
      setData(result);
      setIsLoading(false);
    });
  };
  
  return (
    <div className="feature-demo">
      <h1>Improved Suspense API</h1>
      
      <div className="demo-section">
        <h2>Suspense with Data Fetching</h2>
        <p>
          React 19 enhances the Suspense API with improved support for 
          data fetching, streaming, and component loading.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="loading-time" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Simulated Loading Time (ms):
          </label>
          <input
            id="loading-time"
            type="number"
            value={loadingTime}
            onChange={(e) => setLoadingTime(Number(e.target.value))}
            min="500"
            max="10000"
            step="500"
            style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
          />
        </div>
        
        <button 
          onClick={handleLoadData}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
          Load Data
        </button>
        
        <Suspense fallback={<div style={{ marginTop: '1rem' }}>Loading data...</div>}>
          {isLoading ? (
            <div style={{ marginTop: '1rem' }}>Loading data...</div>
          ) : data ? (
            <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
              <h3>Data Loaded</h3>
              <p>{data.message}</p>
              <p>Loaded at: {data.timestamp}</p>
            </div>
          ) : null}
        </Suspense>
      </div>
      
      <div className="demo-section">
        <h2>Key Features of Improved Suspense</h2>
        <ul>
          <li>Enhanced support for data fetching with the new <code>use</code> hook</li>
          <li>Better integration with server components</li>
          <li>Improved streaming capabilities</li>
          <li>More granular loading states</li>
          <li>Simplified API for handling asynchronous operations</li>
        </ul>
      </div>
    </div>
  );
}