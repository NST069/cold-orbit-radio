import React from 'react';

import RadioCard from './components/RadioCard';
import Colors from './util/Palette';

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: Colors.BG_BASE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(12px, 3vw, 24px)'
    }}>
      <RadioCard/>
    </div>
  );
}

export default App;
