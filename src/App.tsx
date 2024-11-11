import React, { useState } from 'react';
import { Toolbar } from './components/toolbar';
import { markdownStyles } from './config/post-styles';

function App() {
  const [selectedStyle, setSelectedStyle] = useState(markdownStyles[0].name);

  return (
    <div className="w-full h-full min-w-[300px] min-h-[150px] p-4 bg-white">
      <Toolbar 
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        markdownStyles={markdownStyles}
      />
    </div>
  );
}

export default App;