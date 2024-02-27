import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react"
import Navbar from "./components/Navbar"
import Main from "./components/Main.jsx"

function App() {
  return (
    <div className="container">
        <Navbar />
        <Main />
    </div>
)
}

export default App
