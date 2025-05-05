import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function OpenTicket() {
    const [formData, setFormData] = useState({
        cus_name: '',
        email: '',
        phone_number: '',
        content: '',
    });

    const [reference, setReference] = useState(null);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/open-ticket') {
            // Reset form when this component is loaded
            setFormData({ cus_name: '', email: '', phone_number: '', content: '' });
            setSuccess(null);
            setReference(null);
            setErrors({});
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setReference(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await axios.post('/api/tickets', formData);
            console.log('response.data', response.data)
            setReference(response.data.reference);
            setSuccess('Your ticket has been submitted successfully.');
        } catch (error) {
            if (error.response?.status === 422) {
                console.log('error.response:', error.response.data.errors);
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-2">
            <h2 className="text-2xl font-semibold mb-4">Open a Support Ticket</h2>

            {success ? (
                <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
                    {success} <br />
                    <strong>Reference:</strong> {reference}
                </div>
            ) : (
                <>
                    {errors.general && (
                        <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">{errors.general}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                        <div>
                            <label className="block text-sm font-medium mb-1">Customer Name</label>
                            <input
                                type="text"
                                name="cus_name"
                                required
                                className="w-full border border-gray-300 rounded p-2"
                                value={formData.cus_name}
                                onChange={handleChange}
                            />
                            {errors.cus_name && <p className="text-red-600 text-sm">{errors.cus_name[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full border border-gray-300 rounded p-2"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone_number"
                                required
                                className="w-full border border-gray-300 rounded p-2"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                            {errors.phone_number && <p className="text-red-600 text-sm">{errors.phone_number[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Problem</label>
                            <textarea
                                name="content"
                                required
                                rows="4"
                                className="w-full border border-gray-300 rounded p-2"
                                value={formData.content}
                                onChange={handleChange}
                            ></textarea>
                            {errors.content && <p className="text-red-600 text-sm">{errors.content[0]}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Ticket'}
                        </button>
                    </form>
                </>
            )}

        </section>
    );
}
