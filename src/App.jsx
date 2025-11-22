import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ResumeProvider } from './contexts/ResumeProvider'
import HomePage from './pages/homePage/HomePage'
import CreatePage from './pages/createPage/CreatePage'
import SavedPage from './pages/savedPage/SavedPage'
import Header from './components/Header'

function App() {
  return (
    <ResumeProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-24">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/saved" element={<SavedPage />} />
            </Routes>
            </main>
        </div>
        </BrowserRouter>
    </ResumeProvider>
  )
}

export default App
