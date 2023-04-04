import { useState } from "react";
import { createContext } from "react";
import jwtDecode from 'jwt-decode'
import { useEffect } from "react";
import { useRouter } from 'next/router';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({ userId: 0, userName: "" })
    const [auth, setAuth] = useState(false)
    const router = useRouter();

    const values = {
        setAuth,
        auth,
        user
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext