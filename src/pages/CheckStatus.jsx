import React, { useState } from 'react';
import axios from 'axios';

export default function CheckStatus() {
    const [reference, setReference] = useState('');
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkTicket = async () => {
        if (!reference) return;

        setLoading(true);
        setError(null);
        setTicket(null);

        try {
            const response = await axios.get(`/api/tickets/${reference}`);
            console.log('response', response)
            setTicket(response.data.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Ticket not found. Please check your reference number.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-2">
            <div className="max-w-2xl mx-auto py-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Check Ticket Status</h2>

                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        placeholder="Enter your ticket reference number"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                    />
                    <button
                        onClick={checkTicket}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Checking...' : 'Check'}
                    </button>
                </div>

                {error && <p className="text-red-600">{error}</p>}

                {ticket && (
                    <div className="border rounded p-4 bg-white shadow">
                        <h3 className="font-bold mb-2">Ticket Status: <span className="capitalize">{ticket.status}</span></h3>
                        <p><strong>Name:</strong> {ticket.customer_name}</p>
                        <p><strong>Email:</strong> {ticket.email}</p>
                        <p><strong>Description:</strong> {ticket.content}</p>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Replies</h4>
                            {ticket.replies.length === 0 ? (
                                <p className="text-gray-500">No replies yet.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {ticket.replies.map((reply, i) => (
                                        <li key={i} className="border-t pt-2">
                                            <p className="text-sm text-gray-600 mb-1">{reply.timestamp} — <strong>{reply.replied_by}</strong></p>
                                            <p>{reply.message}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
