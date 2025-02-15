import './styles/index.css';
import './styles/App.css'; 
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage } from './pages/Auth'
import { UserPage } from './pages/User';
import { PostPage } from './pages/Posts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/posts" element={<PostPage />}/>
      </Routes>
    </BrowserRouter>
  );
}