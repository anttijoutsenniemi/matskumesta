// src/components/Counter.tsx
import React from 'react';
import useStore from '../stores/useStore';

const Counter: React.FC = () => {
  // Use the store hooks to access state and actions
  const { count, increment, decrement } = useStore();

  const logCount = () => {
    
    increment();
    console.log(count);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={logCount}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter;
