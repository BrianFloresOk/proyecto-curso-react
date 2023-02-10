import React, { createContext, useEffect, useState } from 'react'
import { clientAxios } from '../config/clientAxios';


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authUser = async () => {
            const token = sessionStorage.getItem("token");
            if(!token) {
                setLoading(false)
                return null
            }

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: token
                }
            }

            try { 
                const { data } = await clientAxios.get(`/users/profile`, config);
                setAuth(data.user)

            } catch (error) {
                console.log(error.response?.data)
                sessionStorage.removeItem('token') 
            } finally {
                setLoading(false)
            }
        }

        authUser()

    }, [])

    return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    loading
                }
            }
        >
            {/* Para tener a dispocicion la informacion
                de arriba se usa context y se la pasa como children
            */}
            { children }
        </AuthContext.Provider>
    )
};

export default AuthContext