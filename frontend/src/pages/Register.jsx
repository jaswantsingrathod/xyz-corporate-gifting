import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../redux/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const [form, setForm] = useState({ employeeName: '', email: '', password: '', confirmPassword: '' });
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!form.employeeName) {
            toast.error('Please enter your full name');
            return;
        }
        if (!form.email) {
            toast.error('Please enter your email address');
            return;
        }
        if (!validateEmail(form.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const result = await dispatch(registerUser({
            employeeName: form.employeeName,
            email: form.email,
            password: form.password,
        }));

        if (registerUser.fulfilled.match(result)) {
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } else if (registerUser.rejected.match(result)) {
            toast.error(result.payload || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-4 shadow-lg shadow-blue-100">X</div>
                        <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Create Corporate Account</h2>
                        <p className="mt-3 text-slate-500 font-medium">
                            Join your team on XYZ Gifts. Already have an account?{' '}
                            <Link to="/login" className="text-[#2563EB] hover:underline font-bold">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Full Name</label>
                                <input
                                    type="text"
                                    name="employeeName"
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium placeholder-slate-400"
                                    placeholder="John Doe"
                                    value={form.employeeName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium placeholder-slate-400"
                                    placeholder="name@gmail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium placeholder-slate-400"
                                        placeholder="········"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Confirm</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium placeholder-slate-400"
                                        placeholder="········"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary h-12 flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Complete Registration'
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-slate-400 text-sm font-medium">
                    By registering, you agree to our Corporate Terms of Service.
                </p>
            </div>
        </div>
    );
};

export default Register;
