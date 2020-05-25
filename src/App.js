import React from 'react';
import logo from './logo.svg';
import './App.css';

import ImageUpload from './components/image-upload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <ImageUpload/>
      </main>
    </div>
  );
}

export default App;
