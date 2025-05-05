import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_TICKETS_API_BASE_URL;
axios.defaults.headers.common['Accept'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
