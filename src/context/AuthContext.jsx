import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [agent, setAgent] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // <-- added

    useEffect(() => {
        const storedToken = localStorage.getItem('agent_token');
        const storedAgent = localStorage.getItem('agent_info');

        if (storedToken && storedAgent) {
            setToken(storedToken);
            setAgent(JSON.parse(storedAgent));
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setLoading(false); // <-- done loading regardless
    }, []);

    const login = (agentData, token) => {
        setAgent(agentData);
        setToken(token);
        localStorage.setItem('agent_token', token);
        localStorage.setItem('agent_info', JSON.stringify(agentData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const logout = () => {
        setAgent(null);
        setToken(null);
        localStorage.removeItem('agent_token');
        localStorage.removeItem('agent_info');
        delete axios.defaults.headers.common['Authorization'];
    };

    console.log("Agent:", agent);
    console.log("Token:", token);

    return (
        <AuthContext.Provider value={{ agent, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
