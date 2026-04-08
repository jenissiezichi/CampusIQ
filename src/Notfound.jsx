import React from 'react';
import './index.css';
import {useNavigate} from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate('/');
    }
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-gray-800 font-bold text-3xl mb-2">404 - Page Not found</h1>
            <p className="text-gray-500 mb-3">The page you're looking for doesnt exist</p>
            <button onClick={handleNavigate} className="cursor-pointer rounded-full bg-blue-400 w-30">Go back Home</button>
        </div>
    );
}
export default NotFound;