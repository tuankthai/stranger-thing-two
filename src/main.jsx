import React from 'react'
import ReactDOM from 'react-dom/client'


import App from './App.jsx'
// import Image from './components/Image.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import Posts from './components/Posts.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register.jsx'
import AddPost from './components/AddPost.jsx'
import ViewPost from './components/ViewPost.jsx'
import SendMsg from './components/SendMsg.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      
      <Routes>
        {/* <Route path="/image" element={<Image />} /> */}

        <Route path="/Profile" element={<Profile />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/ViewPost" element={<ViewPost />} />
        <Route path="/SendMsg" element={<SendMsg />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </BrowserRouter>
    
  </React.StrictMode>,
)
