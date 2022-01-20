import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WinDetail from './Pages/Detail/WinDetail';
import ImgUpload from './Pages/User/ImgUpload';

import App from './App';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/win/winid" element={<WinDetail />} />
        <Route path="/win/user/upload" element={<ImgUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
