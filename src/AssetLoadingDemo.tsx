import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';

// Mock implementation of React 19's asset loading APIs
function useImage(src) {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!src) {
      setStatus('error');
      setError(new Error('No image source provided'));
      return;
    }
    
    setStatus('loading');
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setStatus('success');
    };
    
    img.onerror = (e) => {
      setStatus('error');
      setError(new Error('Failed to load image'));
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return { status, error };
}

function useScript(src, options = {}) {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!src) {
      setStatus('error');
      setError(new Error('No script source provided'));
      return;
    }
    
    // For demo purposes, we'll simulate script loading
    setStatus('loading');
    
    const timer = setTimeout(() => {
      // Simulate success for demo purposes
      // In a real implementation, we would actually load the script
      setStatus('success');
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [src]);
  
  return { status, error };
}

// Mock preload function
function preload(src, options = {}) {
  // In a real implementation, this would use link preload or prefetch
  // For demo purposes, this is just a placeholder
  return null;
}

export default function AssetLoadingDemo() {
  const [imageUrl, setImageUrl] = useState(reactLogo);
  
  // useImage is a new hook in React 19 for loading and tracking image assets
  const { status: imageStatus, error: imageError } = useImage(imageUrl);
  
  // useScript is a new hook in React 19 for loading external scripts
  const { status: scriptStatus, error: scriptError } = useScript(
    'https://cdn.example.com/demo-script.js',
    { async: true }
  );
  
  return (
    <div className="feature-demo">
      <h1>Asset Loading API</h1>
      
      <div className="demo-section">
        <h2>Image Loading with useImage</h2>
        <p>
          React 19 introduces new APIs for loading and managing assets like images 
          and scripts with built-in loading states and error handling.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="image-url" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Image URL:
          </label>
          <input
            id="image-url"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
          />
        </div>
        
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', maxWidth: '300px' }}>
          {imageStatus === 'loading' && <p>Loading image...</p>}
          {imageStatus === 'error' && <p style={{ color: 'red' }}>Error loading image: {imageError?.message}</p>}
          {imageStatus === 'success' && (
            <img 
              src={imageUrl} 
              alt="Loaded with useImage" 
              style={{ maxWidth: '100%' }} 
            />
          )}
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Script Loading with useScript</h2>
        <p>Current script status: <strong>{scriptStatus}</strong></p>
        {scriptError && (
          <p style={{ color: 'red' }}>Error loading script: {scriptError.message}</p>
        )}
      </div>
      
      <div className="demo-section">
        <h2>Key Features of Asset Loading API</h2>
        <ul>
          <li>Declarative asset loading with hooks like <code>useImage</code> and <code>useScript</code></li>
          <li>Built-in loading states and error handling</li>
          <li>Asset preloading with the <code>preload</code> function</li>
          <li>Automatic resource prioritization</li>
          <li>Support for various asset types (images, scripts, stylesheets, etc.)</li>
        </ul>
      </div>
    </div>
  );
}