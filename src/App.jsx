import React, { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import WritePage from './pages/WritePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Layout from './Layout/Layout';
import BlogPage from './pages/BlogPage';
import EditPage from './pages/EditPage';

function App() {
  
  return (
    <div>
      {/*  */}
      <BrowserRouter>
      <Routes>
      <Route element = {<Layout/>} >
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/write' element={<WritePage/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/:id' element={<BlogPage/>}></Route>
        <Route path='/:id/edit' element={<EditPage/>}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
    </div>);
  }

export default App;

