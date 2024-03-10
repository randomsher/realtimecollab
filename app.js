// App.js

import React from 'react';
import DocumentEditor from './DocumentEditor';

const App = () => {
  return (
    <div>
      <h1>Real-Time Collaboration Tool</h1>
      <DocumentEditor docId="example_document" />
    </div>
  );
};

export default App;
