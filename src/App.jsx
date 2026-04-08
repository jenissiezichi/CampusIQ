import { useState } from 'react'
import React from 'react';
import Home from'./Home';
import StudyApp from './StudyApp';
import './index.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import NotFound from "./Notfound.jsx";


function App() {
  return (<BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/study" element={<StudyApp/>} />
          <Route path="*" element={<NotFound/>} />

        </Routes>
      </BrowserRouter>
  );
}
export default App;
