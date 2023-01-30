import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import Home from '../pages/Home'
import Register from '../pages/Register'
import ForgetPassword from '../pages/ForgetPassword'
import Login from '../pages/Login'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/register"} element={<Register />} />
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/forget-password"} element={<ForgetPassword />} />
      </Routes>
    </div>
  )
}

export default App
