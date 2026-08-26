import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import { Nav } from './components/shared/Nav'
import { Footer } from './components/shared/Footer'
import { DevCursor } from './components/shared/DevCursor'
import { BootLoader } from './components/shared/BootLoader'
import { Toaster } from 'react-hot-toast'


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
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Futuristic styled toast with Chakra Petch/JetBrains Mono matching the design system
            className: '!glass-panel !clip-hud !font-mono !text-xs !text-foreground !rounded-none !shadow-[var(--shadow-panel)]',
            style: {
              background: 'var(--glass)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
              borderRadius: '0px',
              padding: '12px 18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.05em',
            },
            success: {
              iconTheme: {
                primary: 'var(--primary)',
                secondary: 'var(--background)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--destructive)',
                secondary: 'var(--background)',
              },
            },
          }}
        />
      </Router>
    </ThemeProvider>
  )
}

export default App
