import AuthContext from '@/context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export default function Register({ cities }) {
    const [formData, setFormData] = useState({})
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            if (data.success === true) {
                toast.success("Kayıt başarılı.")
                router.push("/login")
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
        <div className='h-screen flex flex-row items-center px-16 gap-6 justify-between '>
            <div className='w-1/2'>
                <Image src={"/undraw_forms_re_pkrt.svg"} width={600} height={700} alt='' />
            </div>
            <div className='w-1/2 text-center'>
                <h1 className='text-xl font-semibold mb-3'>Kayıt ol</h1>
                <form className='flex flex-col w-full justify-center gap-5 shadow-xl rounded-lg p-5 h-auto' onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-4'>
                        <input className='p-3 shadow-md rounded-2xl' type="text" name="firstName" placeholder='İsim' onChange={handleChange} />
                        <input className='p-3 shadow-md rounded-2xl' type="text" name="lastName" placeholder='Soyisim' onChange={handleChange} />
                    </div>
                    <input className='p-3 shadow-md rounded-2xl' type="email" name="email" placeholder='Email' onChange={handleChange} />
                    <div className='flex flex-row gap-4'>
                        <select className='p-3 shadow-md rounded-2xl w-1/2' name='city' onChange={handleChange}>
                            <option value="">Şehir</option>
                            {cities.map(city => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                        </select>
                        <select className='p-3 shadow-md rounded-2xl w-1/2' name='role' onChange={handleChange}>
                            <option value="">Hesap Türü</option>
                            <option value={"customer"}>Müşteri</option>
                            <option value={"restaurantOwner"}>Restoran Sahibi</option>
                        </select>
                    </div>
                    <input className='p-3 shadow-md rounded-2xl' type="password" name="password" placeholder='Şifre' onChange={handleChange} />
                    <input className='p-3 shadow-md rounded-2xl' type="text" name="phone" placeholder='Telefon' onChange={handleChange} />
                    <textarea className='p-3 shadow-md rounded-2xl' name="address" placeholder='Address' onChange={handleChange} />
                    <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' type="submit">Kayıt ol</button>
                </form >
            </div>
        </div >

    )
}

export async function getStaticProps() {
    const response = await fetch('http:localhost:3000/api/city')
    const data = await response.json()
    const cities = data.data
    return {
        props: {
            cities
        }
    }
}
