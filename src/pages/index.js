import AuthContext from "@/context/AuthContext"
import Cookies from "js-cookie"
import { useContext } from "react"

export default function Home() {
  const { auth } = useContext(AuthContext)
  const token = Cookies.get("token")
  return (
    <>
      <h1>{auth ? "Giriş yapıldı" : "Giriş yapılmadı"}</h1>

    </>
  )
}
