import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';
import WinDetail from './Pages/Detail/WinDetail';
import ImgUpload from './Pages/User/ImgUpload';
import User from './Pages/User/User';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/win/:winid" element={<WinDetail />} />
        <Route path="/win/user/upload" element={<ImgUpload />} />
        <Route path="/win/user/:userNumber" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
