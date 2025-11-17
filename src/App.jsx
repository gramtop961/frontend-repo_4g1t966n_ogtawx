import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Sneaker from './pages/Sneaker'
import Customizer from './pages/Customizer'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/explore" element={<Explore/>} />
      <Route path="/sneaker/:id" element={<Sneaker/>} />
      <Route path="/customize/:id" element={<Customizer/>} />
      <Route path="/customize/demo" element={<Customizer/>} />
    </Routes>
  )
}
