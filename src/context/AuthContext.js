import { useState } from "react";
import { createContext } from "react";
import jwtDecode from 'jwt-decode'
import { useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { toast } from "react-toastify";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [auth, setAuth] = useState(false)
    const router = useRouter();

    const login = async (token) => {
        setAuth(true)
        Cookies.set("token", token)
        const decode = await jwtDecode(token)
        setUser(decode.user)
        router.push("/")
    }

    const isLoggedIn = async () => {
        const token = Cookies.get("token")
        if (token) {
            setAuth(true)
            const decode = await jwtDecode(token)
            setUser(decode.user)
        } else {
            setUser({})
            setAuth(false)
        }
    }
    const checkTokenExpired = () => {
        const token = Cookies.get("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                logout();
                console.log("token expired")
            }
        }
    };

    const logout = () => {
        setAuth(false)
        Cookies.remove("token")
        setUser({})
        toast.success("Çıkış yapıldı")
        router.push("/")
    }

    useEffect(() => {
        checkTokenExpired()
        isLoggedIn()
    }, [auth])


    const values = {
        setAuth,
        auth,
        user,
        setUser,
        login,
        logout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext