import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../src/Pages/Main/Main';
import WinDetail from './Pages/Detail/WinDetail';
import ImgUpload from './Pages/User/ImgUpload';
import User from './Pages/User/User';
import KakaoAuth from './KakaoAuth';
import List from './Pages/List/List';
import BoardPage from './Pages/BoardPage/BoardPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/win/:winId" element={<WinDetail />} />
        <Route path="/win/user/upload" element={<ImgUpload />} />
        <Route path="/user/:userNumber" element={<User />} />
        <Route path="/user/kakao" element={<KakaoAuth />} />
        <Route path="/win" element={<List />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
