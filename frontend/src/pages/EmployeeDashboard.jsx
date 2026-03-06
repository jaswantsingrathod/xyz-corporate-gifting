import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyOrders } from '../redux/orderSlice';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Preparing: 'bg-blue-100 text-blue-700',
    Ready: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
};

const statusLabels = {
    Pending: 'Order Placed',
    Preparing: 'Order is Preparing',
    Ready: 'Order Ready to Pick Up from Company',
    Delivered: 'Order Delivered',
};

const EmployeeDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { myOrders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header section with Welcome Message */}
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-[#1E293B] tracking-tight">
                    Welcome back, <span className="text-[#2563EB]">{user?.employeeName?.split(' ')[0] || 'Employee'}</span>
                </h1>
                <p className="text-slate-500 font-medium mt-2">Manage your corporate gifts and welcome kits from your central dashboard.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Main Action Card */}
                <div className="lg:col-span-2 bg-[#1E293B] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[320px]">
                    <div className="relative z-10 max-w-lg">
                        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-blue-500/20">Active Now</span>
                        <h2 className="text-3xl font-bold mb-4">Choose Your Welcome Kit</h2>
                        <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                            A fresh start deserves a premium welcome. Browse our curated collection and select the products that fit your style.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <Link to="/welcome-kit" className="btn-primary inline-flex items-center gap-2 py-3 px-8">
                            Select My Kit
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Abstract background element */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#2563EB] rounded-full blur-[100px] opacity-10 -mr-20 -mb-20"></div>
                    <div className="absolute right-12 top-12 opacity-5">
                        <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36 2.38 3.24L17 10.83 14.92 8H20v6z" />
                        </svg>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-md flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#1E293B] mb-2 text-center">Your Activity</h3>
                        <p className="text-slate-400 text-sm font-medium text-center mb-10">Overview of your history</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center text-xl">📦</div>
                                <span className="font-bold text-slate-700">Total Kits</span>
                            </div>
                            <span className="text-2xl font-black text-[#1E293B]">{myOrders.length}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">✅</div>
                                <span className="font-bold text-slate-700">Received</span>
                            </div>
                            <span className="text-2xl font-black text-[#1E293B]">{myOrders.filter(o => o.status === 'Delivered').length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History Table */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-[#1E293B]">Order History</h3>
                    <div className="h-px flex-grow ml-8 bg-slate-100"></div>
                </div>

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2563EB] mb-4"></div>
                        <p className="font-medium">Syncing with server...</p>
                    </div>
                ) : myOrders.length === 0 ? (
                    <div className="bg-white rounded-[2rem] py-20 px-10 text-center border-2 border-dashed border-slate-100">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-3xl mb-6 text-3xl">📭</div>
                        <h4 className="text-xl font-bold text-[#1E293B] mb-2">No items to track</h4>
                        <p className="text-slate-400 font-medium max-w-xs mx-auto mb-8">
                            Your selections will appear here once you place an order.
                        </p>
                        <Link to="/welcome-kit" className="text-[#2563EB] font-bold hover:underline">
                            Build your first kit →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {myOrders.map(order => (
                            <div key={order._id} className="card-corporate hover:shadow-xl group">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-[#2563EB]/5 group-hover:border-[#2563EB]/10 transition-colors">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">ID</span>
                                            <span className="text-sm font-black text-[#1E293B] uppercase">{order._id.slice(-4)}</span>
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {order.selections?.map((sel, i) => (
                                                <div key={i} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
                                                    <span className="text-slate-400 uppercase mr-1">{sel.category}:</span> {sel.option}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-slate-400">
                                            <svg className="w-4 h-4 mr-1.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="lg:text-right flex items-center lg:items-end justify-between lg:flex-col gap-2">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                                            {statusLabels[order.status] || order.status}
                                        </span>
                                        <span className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">Verified Order</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;
