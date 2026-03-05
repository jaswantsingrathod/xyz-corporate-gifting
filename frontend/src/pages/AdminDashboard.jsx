import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, createItem, deleteItem, deleteOption } from '../redux/itemSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.items);
    const [form, setForm] = useState({ category: '', options: [{ name: '', brand: '', description: '', image: '' }] });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleOptionChange = (idx, field, value) => {
        const updated = [...form.options];
        updated[idx] = { ...updated[idx], [field]: value };
        setForm({ ...form, options: updated });
    };

    const addOption = () => setForm({ ...form, options: [...form.options, { name: '', brand: '', description: '', image: '' }] });

    const removeOptionFromForm = (idx) => {
        if (form.options.length === 1) return;
        setForm({ ...form, options: form.options.filter((_, i) => i !== idx) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        if (!form.category.trim()) {
            setFormError('Category name is required.');
            return;
        }
        if (form.options.some(o => !o.name.trim())) {
            setFormError('All options must have a name.');
            return;
        }
        setSubmitting(true);
        const result = await dispatch(createItem({ category: form.category, options: form.options }));
        setSubmitting(false);
        if (createItem.fulfilled.match(result)) {
            setFormSuccess('Item(s) added successfully!');
            setForm({ category: '', options: [{ name: '', brand: '', description: '', image: '' }] });
        } else {
            setFormError(result.payload || 'Failed to create item');
        }
    };

    const handleDeleteItem = (id) => {
        if (window.confirm('Delete this entire item category?')) dispatch(deleteItem(id));
    };

    const handleDeleteOption = (itemId, optionId) => {
        if (window.confirm('Remove this option?')) dispatch(deleteOption({ itemId, optionId }));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-32 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#2563EB]/5 text-[#2563EB] rounded-xl font-bold transition-all">
                        <span className="text-xl">🛠️</span>
                        Manage Catalog
                    </Link>
                    <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold transition-all group">
                        <span className="text-xl group-hover:scale-110 transition-transform">📦</span>
                        Order Console
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Catalog Management</h1>
                    <p className="text-slate-500 font-medium mt-1">Configure your corporate gift options and categories.</p>
                </div>

                {/* Create Item Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 mb-12">
                    <h3 className="text-lg font-bold text-[#1E293B] mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#2563EB] rounded-full"></span>
                        Create New Category
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Premium Tech, Apparel"
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Available Options</label>
                                <button type="button" onClick={addOption} className="text-[#2563EB] font-bold text-xs hover:underline">+ Add Entry</button>
                            </div>

                            <div className="space-y-4">
                                {form.options.map((opt, idx) => (
                                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group animate-in fade-in slide-in-from-top-2">
                                        {form.options.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeOptionFromForm(idx)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center text-sm font-bold shadow-sm hover:text-red-500 transition-colors"
                                            >
                                                ×
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input
                                                type="text"
                                                placeholder="Model Name"
                                                value={opt.name}
                                                onChange={e => handleOptionChange(idx, 'name', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Brand (Optional)"
                                                value={opt.brand}
                                                onChange={e => handleOptionChange(idx, 'brand', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <textarea
                                                placeholder="Brief description of the product..."
                                                rows="2"
                                                value={opt.description}
                                                onChange={e => handleOptionChange(idx, 'description', e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB] resize-none"
                                            ></textarea>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-grow">
                                                <input
                                                    type="text"
                                                    placeholder="Image URL (Unsplash or direct link)"
                                                    value={opt.image}
                                                    onChange={e => handleOptionChange(idx, 'image', e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                                                />
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {opt.image ? <img src={opt.image} alt="" className="w-full h-full object-cover" /> : <span className="text-xl">🖼️</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {formError && (
                            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center py-3 rounded-xl">
                                {formError}
                            </div>
                        )}
                        {formSuccess && (
                            <div className="bg-green-50 border border-green-100 text-green-700 text-xs font-bold text-center py-3 rounded-xl">
                                {formSuccess}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full btn-primary h-12 flex items-center justify-center gap-2"
                        >
                            {submitting ? 'Processing request...' : 'Save Category Configuration'}
                        </button>
                    </form>
                </div>

                {/* Existing Catalog List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[#1E293B]">Live Catalog ({items.length})</h3>
                        <div className="h-px flex-grow ml-6 bg-slate-100 italic text-[10px] text-slate-300 font-bold tracking-widest uppercase text-right">Production Env</div>
                    </div>

                    {loading && (
                        <div className="py-12 flex flex-col items-center justify-center text-slate-300">
                            <div className="animate-spin h-8 w-8 border-2 border-[#2563EB] border-t-transparent rounded-full mb-4"></div>
                            <p className="text-xs font-black uppercase tracking-widest">Refreshing...</p>
                        </div>
                    )}

                    {!loading && items.length === 0 && (
                        <div className="py-20 text-center bg-white rounded-2xl border border-slate-100 font-medium text-slate-400">
                            The catalog is empty. Start by adding a category above.
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {items.map(item => (
                            <div key={item._id} className="card-corporate !p-0 overflow-hidden border-slate-200">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                    <h4 className="font-extrabold text-[#1E293B] capitalize text-lg tracking-tight">{item.category}</h4>
                                    <button
                                        onClick={() => handleDeleteItem(item._id)}
                                        className="text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        Drop Category
                                    </button>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {item.options?.map(opt => (
                                        <div key={opt._id} className="p-4 flex items-center gap-4 transition-colors hover:bg-slate-50">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                                                {opt.image ? <img src={opt.image} alt="" className="w-full h-full object-cover" /> : <span className="text-xl italic font-black text-slate-200">{opt.name[0]}</span>}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-slate-700">{opt.name}</p>
                                                    {opt.brand && <span className="text-[8px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">{opt.brand}</span>}
                                                </div>
                                                {opt.description && <p className="text-[10px] text-slate-400 font-medium mt-0.5 line-clamp-1">{opt.description}</p>}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteOption(item._id, opt._id)}
                                                className="text-xs font-bold text-slate-300 hover:text-red-400 p-2 transition-colors"
                                                title="Remove Option"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
