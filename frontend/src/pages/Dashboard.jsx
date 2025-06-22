import React from 'react'
import axiosInstance from '../api/axiosInstance.js';
import { API_PATHS } from '../api/apiPath.js';

const Dashboard = () => {
  const usersData = [];

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.USER.GETALLUSERS);
      if (response.status === 200) {
        usersData.push(...response.data);
        // console.log('Users fetched successfully:', usersData);
      }
      // return response.data.users;
      // Simulating fetch for demonstration purposes
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
  fetchUsers();

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span className="font-semibold text-xl tracking-tight">Authentication</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        {/* <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="javascript:;" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Docs
            </a>
            <a href="javascript:;" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Examples
            </a>
            <a href="javascript:;" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Blog
            </a>
          </div>
        </div> */}
      </nav>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            {usersData.length > 0 ?
              (
                <tbody className="text-gray-600 text-sm font-light">
                  {usersData.map(user => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{user.fullname}</td>
                      <td className="py-3 px-6 text-left">{user.email}</td>
                      <td className="py-3 px-6 text-left">{user.username}</td>
                      <td className="py-3 px-6 text-left">{user.role}</td>
                      <td className="py-3 px-6 text-left">
                        <span className={`bg-${user.status === 'active' ? 'green' : 'red'}-200 text-${user.status === 'active' ? 'green' : 'red'}-600 py-1 px-3 rounded-full text-xs`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center space-x-4">
                          <button className="text-blue-500 hover:text-blue-700">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody className="text-gray-600 text-sm font-light">
                  <tr>
                    <td colSpan="6" className="py-3 px-6 text-center">No users found</td>
                  </tr>
                </tbody>
              )
            }
          </table>
        </div>
      </div>

    </>
  )
}

export default Dashboard