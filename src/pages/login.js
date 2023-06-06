import AuthContext from '@/context/AuthContext'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
    const [formData, setFormData] = useState({})
    const { login } = useContext(AuthContext)
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
            if (data.success === true) {
                login(data.data)
                toast.success("Giriş Başarılı")
                router.push("/")
            } else {
                toast.error(data.data)
            }
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
        <div className='h-screen flex flex-row justify-around px-16 gap-10 items-center'>
            <div className='w-1/2'>
                <Image src={'/undraw_login_re_4vu2.svg'} alt='' width={600} height={700} />
            </div>
            <div className='w-1/2 text-center'>
                <h1 className='text-2xl font-semibold mb-3'>Giriş Yap</h1>
                <form className='flex flex-col rounded-md justify-center gap-5 shadow-2xl p-10 h-1/2 w-full' onSubmit={handleSubmit}>
                    <input className='p-3 shadow-md rounded-2xl' type="email" name="email" placeholder='Email' onChange={handleChange} />
                    <input className='p-3 shadow-md rounded-2xl' type="password" name="password" placeholder='Şifre' onChange={handleChange} />
                    <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' type="submit">Giriş Yap</button>
                </form>
            </div>
        </div>
    )
}
