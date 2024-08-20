import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Hompage.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;