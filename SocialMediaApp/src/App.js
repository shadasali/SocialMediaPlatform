import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './Authentication';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Authentication/>} />
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
