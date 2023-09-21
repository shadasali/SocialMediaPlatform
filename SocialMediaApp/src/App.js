import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './Authentication';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Authentication/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
