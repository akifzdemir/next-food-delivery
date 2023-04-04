import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function Login() {
    const [formData, setFormData] = useState({})
    const { setAuth, auth } = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setAuth(true)
            router.push("/")

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='text-xl font-semibold'>Giriş Yap</h1>
            <form className='flex flex-col  justify-center gap-5 shadow-xl p-10 h-auto w-auto' onSubmit={handleSubmit}>
                <input className='p-3 shadow-md rounded-2xl' type="email" name="email" placeholder='Email' onChange={handleChange} />
                <input className='p-3 shadow-md rounded-2xl' type="password" name="password" placeholder='Şifre' onChange={handleChange} />
                <button className='shadow-sm rounded-md p-3 bg-slate-400 text-white' type="submit">Tamamla</button>
            </form>
        </div>

    )
}
