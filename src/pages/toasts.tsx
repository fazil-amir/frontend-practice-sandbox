import React from 'react'

import { useToasts } from '../contexts/ToastsProvider';

export default function Toasts() {
  const { success, error, info } = useToasts();

  return (
    <div style={{ ...styles.container as React.CSSProperties }}>
      <h1>Toasts</h1>
      <div style={{ display: 'flex', gap: '10px'}}>
        <button onClick={() => success('This is a success message!')}>Success</button>
        <button onClick={() => error('This is an error message!')}>Error</button>
        <button onClick={() => info('This is an info message!')}>Info</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1024px',
		width: '100%',
    margin: '0 auto',
		boxSizing: 'border-box',
    padding: '20px',
  }
}