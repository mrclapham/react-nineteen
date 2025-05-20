import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from './hooks'
import { increment, decrement, incrementByAmount } from './store'

import { InfiniteTableFusionLegacy } from '@icap/ui-core'
import { InfiniteTableFusion } from '@icap/ui-core'

// Import React 19 feature pages
import ActionsDemo from './ActionsDemo'
import DocumentMetadataDemo from './DocumentMetadataDemo'
import AssetLoadingDemo from './AssetLoadingDemo'
import SuspenseDemo from './SuspenseDemo'
import HooksDemo from './HooksDemo'

const data = [
  {
    id: 'id-0',
    date: '2020-01-01',
    open: '3463.07',
    high: '3254.34',
    low: '3562.70',
    close: '3286.87',
    adjClose: '3879.47',
    volume: '257',
  },
  {
    id: 'id-1',
    date: '2020-01-02',
    open: '3834.08',
    high: '3764.17',
    low: '3688.64',
    close: '3073.84',
    adjClose: '3722.68',
    volume: '545',
  },
  {
    id: 'id-2',
    date: '2020-01-03',
    open: '3227.21',
    high: '3551.79',
    low: '3135.60',
    close: '3612.49',
    adjClose: '3972.85',
    volume: '926',
  },
]

const columns = {
  adjClose: {
    defaultWidth: 120,
    field: 'adjClose',
    header: 'Adj Close',
    sortable: true,
  },
  close: {
    defaultWidth: 100,
    field: 'close',
    header: 'Close',
    sortable: true,
  },
  date: {
    defaultWidth: 120,
    field: 'date',
    header: 'Date',
    sort: 'asc',
    sortable: true,
  },
  high: {
    defaultWidth: 100,
    field: 'high',
    header: 'High',
    sortable: true,
  },
  low: {
    defaultWidth: 100,
    field: 'low',
    header: 'Low',
    sortable: true,
  },
  open: {
    defaultWidth: 100,
    field: 'open',
    header: 'Open',
    sortable: true,
  },
  volume: {
    defaultWidth: 100,
    field: 'volume',
    header: 'Volume',
    sortable: true,
  },
}

function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React 19</h1>
      
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2>Redux Counter</h2>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
          <button onClick={() => dispatch(decrement())}>-</button>
          <span>Count: {count}</span>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </button>
      </div>
      
      <InfiniteTableFusionLegacy data={data} columns={columns} />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function DataTable() {
  return (
    <div>
      <div>
        <h1>Data Table</h1>
        <InfiniteTableFusion data={data} columns={columns}/>
      </div>
      <div>
      <h1>Data Table Legacy</h1>
      <InfiniteTableFusionLegacy data={data} columns={columns}/>
      </div>


    </div>
  )
}

function About() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a React 19 application with React Router and Redux Toolkit.</p>
      
      <div className="card" style={{ marginTop: '20px' }}>
        <h2>Shared Redux Counter</h2>
        <p>This counter shares state with the Home page: {count}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => dispatch(decrement())}>Decrease</button>
          <button onClick={() => dispatch(increment())}>Increase</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: '20px', flexWrap: 'wrap' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/data">Data Table</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/actions">Actions</Link></li>
            <li><Link to="/document-metadata">Document Metadata</Link></li>
            <li><Link to="/asset-loading">Asset Loading</Link></li>
            <li><Link to="/suspense">Suspense</Link></li>
            <li><Link to="/hooks">Hooks</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="/about" element={<About />} />
          <Route path="/actions" element={<ActionsDemo />} />
          <Route path="/document-metadata" element={<DocumentMetadataDemo />} />
          <Route path="/asset-loading" element={<AssetLoadingDemo />} />
          <Route path="/suspense" element={<SuspenseDemo />} />
          <Route path="/hooks" element={<HooksDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App