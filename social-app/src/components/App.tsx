import React from 'react'
import AppHeader from '@/components/AppHeader'

export default function App({
  title = null,
  className = '',
  children
}) {
  return (
    <div className={`App ${className}`}>
      <AppHeader title={title} />
      {children}
    </div>
  );
}

