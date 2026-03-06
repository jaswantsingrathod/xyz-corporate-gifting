import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchItems } from '../redux/itemSlice';
import { createOrder, fetchMyOrders } from '../redux/orderSlice';

const WelcomeKit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading: itemsLoading } = useSelector((state) => state.items);
    const { token } = useSelector((state) => state.auth);
    const { myOrders, loading: orderLoading, error: orderError } = useSelector((state) => state.orders);

    // selections: { [category]: selectedOptionName }
    const [selections, setSelections] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        dispatch(fetchItems());
        if (token) {
            dispatch(fetchMyOrders());
        }
    }, [dispatch, token]);

    const hasExistingOrder = myOrders && myOrders.length > 0;

    const handleSelectOption = (category, optionName) => {
        if (hasExistingOrder) return;
        setSelections(prev => {
            if (prev[category] === optionName) {
                const updated = { ...prev };
                delete updated[category];
                return updated;
            }
            return { ...prev, [category]: optionName };
        });
    };

    const handleSubmitOrder = async () => {
        if (!token) {
            navigate('/login', { state: { from: '/welcome-kit' } });
            return;
        }

        if (hasExistingOrder) {
            setSubmitError('You have already placed an order.');
            return;
        }

        setSubmitError('');
        const selectionArray = Object.entries(selections).map(([category, option]) => ({
            category,
            option,
        }));

        if (selectionArray.length === 0) {
            setSubmitError('Please select at least one item.');
            return;
        }

        const result = await dispatch(createOrder(selectionArray));
        if (createOrder.fulfilled.match(result)) {
            setOrderSuccess(true);
            setSelections({});
            setTimeout(() => navigate('/employee'), 3000);
        } else {
            setSubmitError(result.payload || 'Failed to submit order.');
        }
    };

    const totalSelected = Object.keys(selections).length;

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight mb-1">Select Your Kit</h1>
                <p className="text-slate-500 text-sm font-medium">Choose one item from each category below to complete your welcome package.</p>
            </div>

            {orderSuccess && (
                <div className="mb-8 bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-xl flex items-center justify-center gap-3 animate-pulse shadow-sm">
                    <span className="text-xl">🎉</span>
                    <p className="font-bold">Order Received! Redirecting...</p>
                </div>
            )}

            {(submitError || orderError) && (
                <div className="mb-8 bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
                    <span className="text-xl">⚠️</span>
                    <p className="font-bold">{submitError || orderError}</p>
                </div>
            )}

            {orderLoading || itemsLoading ? (
                <div className="py-32 flex flex-col items-center justify-center text-slate-300">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mb-6"></div>
                    <p className="font-bold tracking-widest uppercase text-xs">Loading Catalog...</p>
                </div>
            ) : hasExistingOrder ? (
                <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[2rem] border border-slate-100 shadow-xl max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-inner">📦</div>
                    <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Selection Already Submitted</h2>
                    <p className="text-slate-500 font-medium mb-10 max-w-md">
                        You've already curated your welcome kit. Each employee is eligible for one set of corporate gifts.
                    </p>
                    <Link to="/employee" className="btn-primary px-10 py-3 rounded-full font-bold">
                        Track My Order
                    </Link>
                </div>
            ) : items.length === 0 ? (
                <div className="py-32 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-400 font-bold">The catalog is currently empty.</p>
                </div>
            ) : (
                <div className="space-y-12 pb-32">
                    {items.map(item => (
                        <div key={item._id} className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-xl font-bold text-[#1E293B] capitalize tracking-tight">{item.category}</h2>
                                <div className="h-px flex-grow bg-slate-100"></div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {item.options?.map(opt => {
                                    const isSelected = selections[item.category] === opt.name;
                                    return (
                                        <div
                                            key={opt._id}
                                            onClick={() => handleSelectOption(item.category, opt.name)}
                                            className={`card-corporate group cursor-pointer !p-0 overflow-hidden relative border-slate-200 ${isSelected ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'hover:border-slate-300'
                                                }`}
                                        >
                                            {/* Image container */}
                                            <div className="aspect-video bg-slate-50 relative overflow-hidden">
                                                {opt.image ? (
                                                    <img
                                                        src={opt.image}
                                                        alt={opt.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-200">
                                                        <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                                        </svg>
                                                        <span className="text-[10px] font-black uppercase tracking-tighter">No Preview</span>
                                                    </div>
                                                )}

                                                {/* Selection Overlay */}
                                                <div className={`absolute inset-0 bg-blue-600/5 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}></div>

                                                {/* Badge */}
                                                <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${isSelected ? 'bg-[#2563EB] scale-100' : 'bg-white/90 backdrop-blur-sm scale-0'
                                                    }`}>
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-bold text-[#1E293B] text-sm leading-tight group-hover:text-[#2563EB] transition-colors">{opt.name}</h3>
                                                </div>
                                                {opt.brand && (
                                                    <span className="text-[8px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 mb-2 inline-block">{opt.brand}</span>
                                                )}
                                                {opt.description && (
                                                    <p className="text-[11px] text-slate-400 font-medium leading-tight line-clamp-2">{opt.description}</p>
                                                )}
                                            </div>

                                            <div className={`absolute bottom-0 left-0 h-0.5 bg-[#2563EB] transition-all duration-500 ${isSelected ? 'w-full' : 'w-0'}`}></div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Footer Floating Action Bar - Ultra Minimal Pill */}
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                        <div className="bg-[#1E293B]/95 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] rounded-full p-1.5 flex items-center gap-5 pl-6 pr-1.5">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 leading-none mb-0.5">Selection</span>
                                <div className="flex items-baseline gap-1 relative">
                                    <span className={`text-base font-black tracking-tighter ${totalSelected === items.length ? 'text-blue-400' : 'text-white'}`}>{totalSelected}</span>
                                    <span className="text-[9px] font-bold text-slate-600">/ {items.length} chosen</span>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-white/10"></div>

                            <button
                                onClick={handleSubmitOrder}
                                disabled={totalSelected === 0 || orderLoading}
                                className={`h-10 px-6 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 ${totalSelected === items.length && !orderLoading
                                    ? 'bg-[#2563EB] text-white hover:bg-blue-600 shadow-lg'
                                    : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                                    }`}
                            >
                                {orderLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Complete Selection
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WelcomeKit;
