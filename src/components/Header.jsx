import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { containerClass } from "../utils/classes";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { agent, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Optional: call backend logout
        try {
            await axios.post('/api/logout');
        } catch (e) {
            // ignore errors
        }

        logout();             // clear local state
        navigate('/login');   // redirect
    };

    return (
        <header className="bg-gray-900 text-white">
            <div className={containerClass + " flex justify-between items-center py-4 px-2"}>

                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:underline">Support system</Link>
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    {agent ? (
                        <>
                            <Link to="/agent-dashboard" className="hover:underline">Tickets</Link>
                            <button onClick={handleLogout} className="hover:underline text-red-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/open-ticket" className="hover:underline">Open Ticket</Link>
                            <Link to="/check-status" className="hover:underline">Check Status</Link>
                            <Link to="/login" className="hover:underline">Agent Login</Link>
                        </>
                    )}
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col justify-center items-center space-y-6 text-xl">
                    <button
                        className="absolute top-4 right-4 p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close Menu"
                    >
                        <X className="w-7 h-7" />
                    </button>
                    {agent ? (
                        <>
                            <Link to="/agent-dashboard" onClick={() => setIsOpen(false)} className="hover:underline">Tickets</Link>
                            <button onClick={handleLogout} className="hover:underline text-red-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/open-ticket" onClick={() => setIsOpen(false)} className="hover:underline">Open Ticket</Link>
                            <Link to="/check-status" onClick={() => setIsOpen(false)} className="hover:underline">Check Status</Link>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="hover:underline">Agent Login</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
