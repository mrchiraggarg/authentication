// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Router>
    </>
  )
}

export default App