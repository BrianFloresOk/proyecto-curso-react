import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import Home from '../pages/Home'
import Register from '../pages/Register'
import ForgetPassword from '../pages/ForgetPassword'
import ConfirmAccount from '../pages/ConfirmAccount'
import RecoverPassword from '../pages/RecoverPassword'
import Login from '../pages/Login'
import AuthLayout from "../layouts/AuthLayout"
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
{/*         <Route exact path={"/"} element={<Home />} /> */}
        <Route exact path={"/"} element={<AuthLayout />}>
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/register"} element={<Register />} />
          <Route exact path={"/forget-password"} element={<ForgetPassword />} />
          <Route exact path={"/recover-password/:token"} element={<RecoverPassword />} />
          <Route exact path={"/confirm/:token"} element={<ConfirmAccount />} />
          <Route exact path={"*"} element={<h1>404 NOT FOUND</h1>} />
          
        </Route>
      </Routes>
    </div>
  )
}

export default App
