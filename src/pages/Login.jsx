import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('/api/login', form);
            login(res.data.agent, res.data.token);

            // 🔁 Redirect to agent dashboard
            navigate('/agent-dashboard');
        } catch (err) {
            setError('Login failed. Please check your email/password.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="p-2">
            <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
                <h2 className="text-xl font-bold mb-4">Support Agent Login</h2>

                {error && <p className="text-red-600 mb-3">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </section>
    );
}
