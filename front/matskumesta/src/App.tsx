import React from 'react';
import './App.css';
import Counter from './components/Counter';

const App: React.FC = () => {
  return (
    <div>
      <h1>Zustand Counter Example</h1>
      <Counter />
    </div>
  );
}

export default App;
