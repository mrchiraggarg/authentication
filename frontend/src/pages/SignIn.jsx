import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance.js';
import { API_PATHS } from '../api/apiPath.js';
import Header from '../components/Header.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        
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
            const response = await axiosInstance.post('/api/user/LoginUser', formData);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            setErrors({ 
                general: error.response?.data?.message || 'Login failed. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Header title="Sign In" />
            
            <div className="flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600">Sign in to your account to continue</p>
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
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                icon={
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                                >
                                    Create one now →
                                </Link>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignIn;