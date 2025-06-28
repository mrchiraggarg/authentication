import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance.js';
import { API_PATHS } from '../api/apiPath.js';
import Header from '../components/Header.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.confirm_password.trim()) newErrors.confirm_password = 'Please confirm your password';
        if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await axiosInstance.post('/api/user/CreateUser', formData);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            setErrors({ 
                general: error.response?.data?.message || 'Registration failed. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            <Header title="Sign Up" />
            
            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-600">Join us and start managing your account</p>
                        </div>

                        {errors.general && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-700 text-sm font-medium">{errors.general}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type="text"
                                id="fullname"
                                label="Full Name"
                                placeholder="Enter your full name"
                                value={formData.fullname}
                                onChange={handleChange}
                                error={errors.fullname}
                                icon={
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                }
                            />

                            <Input
                                type="email"
                                id="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                icon={
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                }
                            />

                            <Input
                                type="password"
                                id="password"
                                label="Password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                icon={
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <Input
                                type="password"
                                id="confirm_password"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                error={errors.confirm_password}
                                icon={
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            />

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link 
                                    to="/" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                                >
                                    Sign in here →
                                </Link>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUp;