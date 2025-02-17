import './styles/index.css';
import './styles/App.css'; 
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { LoginPage, SignUpPage } from './pages/Auth'
import { UserPage } from './pages/User';
import { PostPage } from './pages/Posts';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/Home';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/posts" element={<PostPage />}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}