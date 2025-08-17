import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { FaMusic, FaEnvelope, FaLock, FaUser, FaSpinner } from "react-icons/fa";

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { registerUser, btnLoading } = useUserData();

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();
        registerUser(name, email, password, navigate);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4">
                        <FaMusic className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">SpotOn</h1>
                    <p className="text-gray-400">Join the music revolution</p>
                </div>

                {/* Register Form */}
                <div className="glass p-8 rounded-3xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-8 text-white">
                        Create Account
                    </h2>
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input 
                                    type="text" 
                                    placeholder="Enter your full name" 
                                    className="auth-input pl-12"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="auth-input pl-12"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input 
                                    type="password" 
                                    placeholder="Create a strong password" 
                                    className="auth-input pl-12"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            disabled={btnLoading} 
                            className="auth-btn flex items-center justify-center gap-2"
                        >
                            {btnLoading ? (
                                <>
                                    <FaSpinner className="w-4 h-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <Link 
                            to="/login" 
                            className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
                        >
                            Already have an account? 
                            <span className="text-green-400 ml-1 font-medium">Sign in here</span>
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;