import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message || '';
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            const user = result.payload.user;
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/employee');
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-4 shadow-lg shadow-blue-100">X</div>
                        <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Welcome Back</h2>
                        <p className="mt-3 text-slate-500 font-medium">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-[#2563EB] hover:underline font-bold">
                                Join as Employee
                            </Link>
                        </p>
                    </div>

                    {successMessage && (
                        <div className="mb-6 bg-green-50 border border-green-100 text-green-700 text-sm font-bold text-center px-4 py-3 rounded-xl flex items-center justify-center gap-2">
                            <span>✅</span> {successMessage}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium placeholder-slate-400"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#1E293B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium placeholder-slate-400"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary h-12 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Sign in to Console'
                            )}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-white text-slate-400 font-bold uppercase tracking-widest">Guest Access</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={async () => {
                                const demoEmail = 'admin@test.com';
                                const demoPassword = 'admin';
                                setEmail(demoEmail);
                                setPassword(demoPassword);
                                const result = await dispatch(loginUser({ email: demoEmail, password: demoPassword }));
                                if (loginUser.fulfilled.match(result)) {
                                    const user = result.payload.user;
                                    navigate(user.role === 'admin' ? '/admin' : '/employee');
                                }
                            }}
                            disabled={loading}
                            className="w-full btn-secondary h-12 flex items-center justify-center gap-2 group border-slate-900 text-slate-900 border-2 hover:bg-slate-900 hover:text-white"
                        >
                            Demo Admin Login
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-slate-400 text-sm font-medium">
                    Protected by Corporate Security Standards.
                </p>
            </div>
        </div>
    );
};

export default Login;
