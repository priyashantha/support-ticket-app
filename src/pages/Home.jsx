import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
    const { agent } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (agent) {
            navigate('/agent-dashboard');
        }
    }, [agent, navigate]);

    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Welcome to the Support System
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-xl mb-6">
                Need help with a product or service you purchased? Open a ticket and our support team will assist you as soon as possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/open-ticket"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
                >
                    Open a Ticket
                </Link>
                <Link
                    to="/check-status"
                    className="border border-blue-600 hover:bg-blue-100 text-blue-600 px-6 py-3 rounded text-lg"
                >
                    Check Ticket Status
                </Link>
            </div>
        </section>
    );
}
