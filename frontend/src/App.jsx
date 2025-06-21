// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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