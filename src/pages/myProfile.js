import AuthContext from "@/context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function myProfile({ cities }) {

    const { user, logout } = useContext(AuthContext)

    const [currentUser, setCurrentUser] = useState({})
    const [formData, setFormData] = useState({})

    useEffect(() => {
        user.id !== undefined &&
            fetch(`/api/user/${user.id}`)
                .then((res) => res.json())
                .then((data) => setCurrentUser(data.data))
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`/api/user/${currentUser._id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            if (data.success === true) {
                toast.success("Güncelleme başarılı.")
                logout()
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
        <div className='h-screen flex flex-col  gap-6 items-center justify-center'>
            <h1 className='text-2xl font-semibold'>{currentUser.firstName}</h1>
            <form className='flex flex-col  justify-center gap-5 shadow-xl rounded-lg p-5 h-auto w-auto' onSubmit={handleSubmit}>
                <div className='flex flex-row gap-4'>
                    <input
                        className='p-3 shadow-md rounded-2xl'
                        type="text" name="firstName"
                        placeholder={`İsim: ${currentUser.firstName}`}
                        onChange={handleChange}
                    />
                    <input
                        className='p-3 shadow-md rounded-2xl'
                        type="text"
                        name="lastName"
                        placeholder={`Soyisim: ${currentUser.lastName}`}
                        onChange={handleChange}
                    />
                </div>
                <input
                    className='p-3 shadow-md rounded-2xl'
                    type="email"
                    name="email"
                    placeholder={`Email: ${currentUser.email}`}
                    onChange={handleChange}
                />
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
                <input
                    className='p-3 shadow-md rounded-2xl'
                    type="password"
                    name="password"
                    placeholder='Şifre'
                    onChange={handleChange}
                />
                <input
                    className='p-3 shadow-md rounded-2xl'
                    type="text"
                    name="phone"
                    placeholder={`Telefon : ${currentUser.phone}`}
                    onChange={handleChange}
                />
                <textarea
                    className='p-3 shadow-md rounded-2xl'
                    name="address"
                    placeholder={`Adres : ${currentUser.address}`}
                    onChange={handleChange}
                />
                <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' type="submit">Güncelle</button>
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

