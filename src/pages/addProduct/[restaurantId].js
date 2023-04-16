import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AddProduct() {
    const router = useRouter()
    const { restaurantId } = router.query
    const [formData, setFormData] = useState({})
    const [categories, setCategories] = useState([])
    const token = Cookies.get("token")

    useEffect(() => {
        fetch("http://localhost:3000/api/category", {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((json) => setCategories(json.data))
        setFormData({ "restaurant": restaurantId })
    }, [restaurantId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            toast.success("Ürün Eklendi.")

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
        <>
            <div className='h-screen flex flex-col gap-6 items-center justify-center'>
                <h1 className='text-2xl font-semibold'>Ürün Ekle</h1>
                <form className='flex flex-col  justify-center gap-5 shadow-2xl p-10 h-1/2 w-1/2' onSubmit={handleSubmit}>
                    <input className='p-3 shadow-md rounded-2xl' type="text" name="name" placeholder='İsim' onChange={handleChange} />
                    <input className='p-3 shadow-md rounded-2xl' type="text" name="description" placeholder='Açıklama' onChange={handleChange} />
                    <input className='p-3 shadow-md rounded-2xl' type="number" name="price" placeholder='Fiyat' onChange={handleChange} />
                    <select className='p-3 shadow-md rounded-2xl' name='category' onChange={handleChange}>
                        <option value="">Kategori</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' type="submit">Tamamla</button>
                </form>
            </div>
        </>
    )
}


