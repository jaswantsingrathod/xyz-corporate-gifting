import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center py-4">
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-white text-xl">X</div>
                        <span className="text-[#1E293B] font-extrabold text-xl tracking-tight">XYZ<span className="text-[#2563EB]">Gifts</span></span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition-colors">Home</Link>
                        {user && user.role === 'employee' && (
                            <Link to="/welcome-kit" className="text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition-colors">Welcome Kits</Link>
                        )}
                        {user && (
                            <Link
                                to={user.role === 'admin' ? '/admin' : '/employee'}
                                className="text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-5">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[#1E293B] text-xs font-bold leading-none">{user.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{user.role}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-[#1E293B] text-white hover:bg-slate-800 px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#2563EB] text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
