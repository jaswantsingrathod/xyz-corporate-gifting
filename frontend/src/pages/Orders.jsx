import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../redux/orderSlice';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Preparing: 'bg-blue-100 text-blue-800',
    Ready: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
};

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleUpdateStatus = (id, status) => {
        dispatch(updateOrderStatus({ id, status }));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-32 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold transition-all group">
                        <span className="text-xl group-hover:scale-110 transition-transform">🛠️</span>
                        Manage Catalog
                    </Link>
                    <Link to="/orders" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB]/5 text-[#2563EB] rounded-xl font-bold transition-all">
                        <span className="text-xl">📦</span>
                        Order Console
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Order Console</h1>
                    <p className="text-slate-500 font-medium mt-1">Track and fulfillment management for all corporate gifts.</p>
                </div>

                {/* Stats summary */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {['Pending', 'Preparing', 'Ready', 'Delivered'].map(s => (
                        <div key={s} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s}</p>
                            <p className={`text-3xl font-black text-[#1E293B]`}>
                                {orders.filter(o => o.status === s).length}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                            <div className="animate-spin h-10 w-10 border-2 border-[#2563EB] border-t-transparent rounded-full mb-6"></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Stream...</p>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center text-red-500 font-bold px-6">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="py-20 text-center text-slate-400 font-medium bg-slate-50/50">
                            No active orders in the queue.
                        </div>
                    ) : (
                        <div className="overflow-x-auto overflow-y-visible">
                            <table className="min-w-full divide-y divide-slate-100 border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee Entity</th>
                                        <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-100/50">Selection Data</th>
                                        <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-100/50">Status Label</th>
                                        <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-100/50">Lifecycle Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {orders.map((order, idx) => (
                                        <tr key={order._id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-slate-50 transition-colors group`}>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300 text-xs border border-slate-200">
                                                        {order.employee?.employeeName?.[0] || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">{order.employee?.employeeName || 'Unknown User'}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold tracking-tight uppercase mt-0.5">{order._id.slice(-6).toUpperCase()} • {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 border-l border-slate-100/50">
                                                <div className="flex flex-wrap gap-2 max-w-sm">
                                                    {order.selections?.map((sel, i) => (
                                                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-bold border border-slate-200/50 leading-none">
                                                            <span className="text-slate-400 mr-1">{sel.category}:</span>{sel.option}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 border-l border-slate-100/50">
                                                <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full border shadow-sm ${statusColors[order.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 border-l border-slate-100/50">
                                                <select
                                                    value={order.status}
                                                    onChange={e => handleUpdateStatus(order._id, e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] appearance-none cursor-pointer"
                                                >
                                                    {['Pending', 'Preparing', 'Ready', 'Delivered'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
