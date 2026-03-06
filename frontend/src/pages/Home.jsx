import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-48 flex flex-col items-center justify-center min-h-[80vh]">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1E293B] tracking-tight mb-6">
                    The Smart Way to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#6366F1]">Gift Your Team</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                    Automate your corporate gifting process. From onboarding welcome kits to seasonal surprises, deliver tokens of appreciation that matter.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/welcome-kit" className="btn-primary">Explore Welcome Kits</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
