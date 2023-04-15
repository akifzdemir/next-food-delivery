import AuthContext from '@/context/AuthContext'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddRestaurant({ cities }) {
    const [formData, setFormData] = useState([])
    const token = Cookies.get("token")
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('/api/restaurant', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data)
            toast.success("Restoran Eklendi.")

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
        <div className='h-screen flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-2xl font-semibold'>Restoran Ekle</h1>
            <form className='flex flex-col  justify-center gap-5 shadow-2xl p-10 h-1/2 w-1/2' onSubmit={handleSubmit}>
                <input className='p-3 shadow-md rounded-2xl' type="text" name="name" placeholder='İsim' onChange={handleChange} />
                <textarea className='p-3 shadow-md rounded-2xl' type="text" name="address" placeholder='Adres' onChange={handleChange} />
                <select className='p-3 shadow-md rounded-2xl' name='city' onChange={handleChange}>
                    <option value="">Şehir</option>
                    {cities.map(city => (
                        <option key={city._id} value={city._id}>{city.name}</option>
                    ))}
                </select>
                <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' type="submit">Tamamla</button>
            </form>
        </div>
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

