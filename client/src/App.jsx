import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import ForgetPassword from '../pages/ForgetPassword'
import ConfirmAccount from '../pages/ConfirmAccount'
import RecoverPassword from '../pages/RecoverPassword'
import Login from '../pages/Login'
import AuthLayout from "../layouts/AuthLayout"
import './App.css'
import { AuthProvider } from './context/authProvider'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { ProjectAdd } from '../pages/ProjectAdd'
import { Project } from "../pages/Project"
import { ProjectEdit } from '../pages/ProjectEdit'
import { Projects } from "../pages/Projects"
import { ProjectsProvider } from './context/ProjectsProvider'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProjectsProvider>
          <Routes>
            <Route exact path={"/"} element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route exact path={"/register"} element={<Register />} />
              <Route exact path={"/forget-password"} element={<ForgetPassword />} />
              <Route exact path={"/recover-password/:token"} element={<RecoverPassword />} />
              <Route exact path={"/confirm/:token"} element={<ConfirmAccount />} />
              <Route exact path={"*"} element={<h1>404 NOT FOUND</h1>} />

            </Route>
            {/* Rutas privadas */}
            <Route path="/projects" element={<ProtectedLayout />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<ProjectAdd />} />
              <Route path="edit-project/:id" element={<ProjectEdit />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
          </ProjectsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
