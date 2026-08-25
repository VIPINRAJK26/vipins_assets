import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import { Nav } from './components/shared/Nav'
import { Footer } from './components/shared/Footer'
import { DevCursor } from './components/shared/DevCursor'
import { BootLoader } from './components/shared/BootLoader'


import { ThemeProvider } from './components/themes/theme-provider'

function App() {

  return (
    <ThemeProvider>
      <Router>
        <BootLoader />
        <DevCursor />
        <Nav />
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
