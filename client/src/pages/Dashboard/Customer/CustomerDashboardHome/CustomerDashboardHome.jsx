import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
    PieChart, Pie, Cell,
    LineChart, Line
} from 'recharts';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner';

const CustomerDashboardHome = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch only this customer's payments
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['customer-payments', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}&type=buyer`);
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-lg"><LoadingSpinner /></div>;
    }

    // Compute stats
    const paidTotal = payments
        .filter(payment => payment.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);

    const pendingTotal = payments
        .filter(payment => payment.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);

    const totalOrders = payments.length;

    // Pie chart data
    const pieData = [
        { name: 'Paid', value: paidTotal },
        { name: 'Pending', value: pendingTotal }
    ];
    const COLORS = ['#25A8D6', '#FACC15'];

    // Line chart data: trend over time
    const trendData = payments.map(p => ({
        date: new Date(p.date).toLocaleDateString(),
        amount: p.amount
    }));

    return (
        <div className=" min-h-screen px-6 py-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-bold ">Customer Dashboard</h2>
                <p className="">Overview of your orders and spending</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
                    <p className="text-gray-500 font-medium">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{totalOrders}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
                    <p className="text-gray-500 font-medium">Total Paid</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">৳{paidTotal.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
                    <p className="text-gray-500 font-medium">Total Pending</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">৳{pendingTotal.toLocaleString()}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="border border-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Order Payment Status</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={[{ name: 'Paid', amount: paidTotal }, { name: 'Pending', amount: pendingTotal }]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `৳${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="amount" fill="#25A8D6" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="border border-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Revenue Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#25A8D6"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `৳${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="border border-white rounded-xl p-6 shadow hover:shadow-lg transition duration-300 lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Spending Trend Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => `৳${value.toLocaleString()}`} />
                            <Legend />
                            <Line type="monotone" dataKey="amount" stroke="#25A8D6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardHome;
