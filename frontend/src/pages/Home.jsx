import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
            {/* Hero Section */}
            <div className="mb-24 text-center">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1E293B] tracking-tight mb-6">
                    The Smart Way to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#6366F1]">Gift Your Team</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                    Automate your corporate gifting process. From onboarding welcome kits to seasonal surprises, deliver tokens of appreciation that matter.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="btn-primary">Explore Welcome Kits</button>
                    <button className="btn-secondary">Learn More</button>
                </div>
            </div>

            {/* Categories Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <div className="card-corporate group hover:-translate-y-2">
                    <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-6 font-bold text-xl group-hover:bg-[#2563EB] group-hover:text-white transition-all">01</div>
                    <h3 className="text-xl font-bold mb-3 text-[#1E293B]">Premium Tech</h3>
                    <p className="text-slate-500 text-sm font-medium">Laptops, headphones, and essential devices for the modern workspace.</p>
                </div>
                <div className="card-corporate group hover:-translate-y-2">
                    <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-6 font-bold text-xl group-hover:bg-[#2563EB] group-hover:text-white transition-all">02</div>
                    <h3 className="text-xl font-bold mb-3 text-[#1E293B]">Branded Apparel</h3>
                    <h3 className="text-xl font-bold mb-3 text-[#1E293B]">Custom branded hoodies, T-shirts, and accessories for your team.</h3>
                </div>
                <div className="card-corporate group hover:-translate-y-2">
                    <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-6 font-bold text-xl group-hover:bg-[#2563EB] group-hover:text-white transition-all">03</div>
                    <h3 className="text-xl font-bold mb-3 text-[#1E293B]">Daily Essentials</h3>
                    <p className="text-slate-500 text-sm font-medium">Eco-friendly bottles, notebooks, and pens to keep productivity high.</p>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
                <h2 className="text-3xl font-extrabold mb-4 relative z-10">Ready to boost employee morale?</h2>
                <p className="text-slate-400 font-medium mb-8 relative z-10">Join 500+ companies using XYZ Gifts for their corporate gifting needs.</p>
                <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-all relative z-10">Get Started Now</button>
            </div>
        </div>
    );
};

export default Home;
