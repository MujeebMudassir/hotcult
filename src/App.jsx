import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoadingScreen from './components/Loading';

const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;
// Opting into the future v7 behavior


const App = () => {


  return (
    <Router >
      <Routes>
        <Route path="/hotcult" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;