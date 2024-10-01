import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default App;
