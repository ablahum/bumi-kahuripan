import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Setting, Login, Register } from './pages'
import 'antd/dist/antd.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
