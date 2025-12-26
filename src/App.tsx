import React from 'react';

import RadioCard from './components/RadioCard';

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <RadioCard/>
    </div>
  );
}

export default App;
