import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

// ✅ Set the base URL from .env
axios.defaults.baseURL = import.meta.env.TICKETS_API_BASE_URL;

// Optional: set default Accept header
axios.defaults.headers.common['Accept'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
