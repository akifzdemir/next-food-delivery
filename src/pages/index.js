import AuthContext from "@/context/AuthContext"
import { useContext } from "react"

export default function Home() {
  const { auth } = useContext(AuthContext)
  return (
    <>
      <h1>{auth ? "Giriş yapıldı" : "Giriş yapılmadı"}</h1>

    </>
  )
}
