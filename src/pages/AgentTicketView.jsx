import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AgentTicketView() {
    const { reference } = useParams();
    const [ticket, setTicket] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchTicket = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/agent/tickets/${reference}`);
            setTicket(res.data.data);
        } catch (err) {
            setError('Ticket not found or failed to load.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, [reference]);

    const handleReply = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await axios.post(`/api/agent/tickets/${reference}/reply`, {
                message: replyText,
            });
            setReplyText('');
            fetchTicket(); // refresh ticket + replies
        } catch (err) {
            setError('Failed to send reply.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p className="p-6">Loading ticket...</p>;
    if (error) return <p className="text-red-600 p-6">{error}</p>;
    if (!ticket) return null;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-4">Ticket #{ticket.reference}</h2>

            <div className="bg-white rounded shadow p-4 mb-6">
                <p><strong>Status:</strong> <span className="capitalize">{ticket.status}</span></p>
                <p><strong>Customer:</strong> {ticket.customer_name}</p>
                <p><strong>Email:</strong> {ticket.email}</p>
                <p><strong>Phone:</strong> {ticket.phone}</p>
                <p className="mt-2"><strong>Description:</strong></p>
                <p className="border p-3 rounded mt-1 bg-gray-50">{ticket.content}</p>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-2">Reply History</h3>
                {ticket.replies.length === 0 ? (
                    <p className="text-gray-500">No replies yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {ticket.replies.map((reply, index) => (
                            <li key={index} className="bg-gray-100 p-3 rounded">
                                <p className="text-sm text-gray-600 mb-1">
                                    {reply.timestamp} — <strong>{reply.replied_by}</strong>
                                </p>
                                <p>{reply.message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form onSubmit={handleReply}>
        <textarea
            className="w-full border p-3 rounded mb-2"
            placeholder="Type your reply..."
            rows="4"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
        />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={submitting}
                >
                    {submitting ? 'Sending...' : 'Send Reply'}
                </button>
            </form>
        </div>
    );
}
