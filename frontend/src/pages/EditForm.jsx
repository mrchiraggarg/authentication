import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance.js';
import { API_PATHS } from '../api/apiPath.js';
import Header from '../components/Header.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const EditForm = () => {
  const { id } = useParams();
  const [usersData, setUsersData] = useState({
    fullname: '',
    email: '',
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const fetchUserById = async (userId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.USER.GETUSERBYID + `/${userId}`);
      if (response.status === 200) {
        setUsersData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsersData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSuccess(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!usersData.fullname) newErrors.fullname = 'Full name is required';
    if (!usersData.email) newErrors.email = 'Email is required';
    if (!usersData.username) newErrors.username = 'Username is required';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      const response = await axiosInstance.post(API_PATHS.USER.UPDATEUSERBYID + `/${id}`, usersData);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Update failed. Please try again.' 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Edit User" />
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner text="Loading user data..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Edit User" />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit User Details</h1>
          <p className="text-gray-600">Update user information below</p>
        </div>

        <Card>
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-600 text-sm font-medium">User updated successfully!</p>
              </div>
            </div>
          )}

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="fullname"
              label="Full Name"
              placeholder="Enter full name"
              value={usersData.fullname}
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
              name="email"
              label="Email Address"
              placeholder="Enter email address"
              value={usersData.email}
              onChange={handleChange}
              error={errors.email}
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Enter username"
              value={usersData.username}
              onChange={handleChange}
              error={errors.username}
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                loading={saving}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                {saving ? 'Saving Changes...' : 'Save Changes'}
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditForm;