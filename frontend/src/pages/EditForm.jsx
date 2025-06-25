import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance.js';
import { API_PATHS } from '../api/apiPath.js';

const EditForm = () => {
  const { _id } = useParams()
  const [usersData, setUsersData] = useState({
    fullname: '',
    email: '',
    username: ''
  })
  const [loading, setLoading] = useState(true)

  console.log('EditForm component rendered with user ID:', _id)

  const fetchUserById = async (userId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.USER.GETUSERBYID, { userId })
      if (response.status === 200) {
        setUsersData(response.data)
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error)
    }
  }

  useEffect(() => {
    fetchUserById(_id)
    setLoading(false)
  }, [_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsersData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span className="font-semibold text-xl tracking-tight">Authentication</span>
        </div>
      </nav>

      <div className="edit-form-container px-4">
        <h2 className="font-semibold text-xl tracking-tight">Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="form-group">
              <label className="block text-sm/6 font-medium" htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500"
                value={usersData.fullname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="block text-sm/6 font-medium" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500"
              value={usersData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="block text-sm/6 font-medium" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500"
              value={usersData.username}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="mt-10 w-full inline-flex justify-center rounded-full text-sm/6 font-semibold bg-gray-950 text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 px-4 py-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  )
}

export default EditForm