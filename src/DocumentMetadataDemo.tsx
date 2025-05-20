import { useState, useEffect } from 'react';

// Mock implementation of React 19's document metadata APIs
function useDocumentTitle(title) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

function Meta({ name, property, content }) {
  useEffect(() => {
    // Create or update meta tag
    let metaTag = document.querySelector(`meta[${name ? 'name' : 'property'}="${name || property}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (name) metaTag.setAttribute('name', name);
      if (property) metaTag.setAttribute('property', property);
      document.head.appendChild(metaTag);
    }
    
    metaTag.setAttribute('content', content);
    
    return () => {
      // Clean up on unmount
      if (metaTag && metaTag.parentNode) {
        metaTag.parentNode.removeChild(metaTag);
      }
    };
  }, [name, property, content]);
  
  return null;
}

export default function DocumentMetadataDemo() {
  const [title, setTitle] = useState('React 19 Document Metadata Demo');
  
  // useDocumentTitle is a new hook in React 19 for setting the document title
  useDocumentTitle(title);
  
  return (
    <div className="feature-demo">
      {/* Meta is a new component in React 19 for managing document metadata */}
      <Meta name="description" content="Exploring React 19's document metadata features" />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content="A demonstration of React 19's metadata capabilities" />
      
      <h1>Document Metadata API</h1>
      
      <div className="demo-section">
        <h2>Dynamic Document Title</h2>
        <p>
          React 19 introduces new APIs for managing document metadata like title, 
          meta tags, and Open Graph properties directly from your components.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="title-input" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Change Page Title:
          </label>
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
          />
        </div>
        
        <p style={{ marginTop: '1rem' }}>
          Current document title: <strong>{title}</strong>
        </p>
        <p>
          Check your browser tab to see the title change in real-time!
        </p>
      </div>
      
      <div className="demo-section">
        <h2>Key Features of Document Metadata API</h2>
        <ul>
          <li>Declarative management of document metadata</li>
          <li>Component-based approach with the <code>Meta</code> component</li>
          <li>Hook-based approach with <code>useDocumentTitle</code></li>
          <li>Support for Open Graph and other social media metadata</li>
          <li>Automatic metadata deduplication and prioritization</li>
        </ul>
      </div>
    </div>
  );
}