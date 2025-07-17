import { Routes, Route } from 'react-router-dom';
import './App.css'
import {Register, Dashboard, Login, ResetPassword} from './pages';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Register isUserSettings={true}/>} />
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
}

export default App;