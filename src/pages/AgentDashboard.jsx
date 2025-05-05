import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AgentDashboard() {
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (page = 1, query = '') => {
        setLoading(true);
        try {
            const res = await axios.get('/api/agent/tickets', {
                params: {
                    search: query,
                    page,
                },
            });
            const { data, meta } = res.data;
            setTickets(data);
            setPagination({
                current: meta.current_page,
                last: meta.last_page,
            });
        } catch (err) {
            console.error('Failed to fetch tickets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData(1, search);
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6">Admin Ticket Dashboard</h2>

            {!!tickets.length && (
                <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search by customer name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </form>
            )}

            {loading ? (
                <p>Loading tickets...</p>
            ) : tickets.length === 0 ? (
                <p className="text-gray-500">No tickets yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2 border">Customer</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Replies</th>
                            <th className="p-2 border">Created</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket) => (
                            <tr
                                key={ticket.reference}
                                className={ticket.status === 'new' ? 'bg-yellow-50' : ''}
                            >
                                <td className="p-2 border">{ticket.customer_name}</td>
                                <td className="p-2 border capitalize">{ticket.status}</td>
                                <td className="p-2 border text-center">{ticket.replies.length}</td>
                                <td className="p-2 border text-sm">{new Date(ticket.created_at).toLocaleString()}</td>
                                <td className="p-2 border">
                                    <Link
                                        to={`/agent/tickets/${ticket.reference}`}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-4 flex space-x-2">
                {Array.from({ length: pagination.last }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => fetchData(i + 1, search)}
                        className={`px-3 py-1 border rounded ${
                            i + 1 === pagination.current ? 'bg-blue-600 text-white' : ''
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
