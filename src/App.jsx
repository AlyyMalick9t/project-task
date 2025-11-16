import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import Login from './components/Pages/Login'
import Dashboard from './components/Pages/Dashboard'

function App() {
  

  return (
    <>
      
      git remote add origin https://github.com/AlyyMalick9t/project-task.git

      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route  path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
