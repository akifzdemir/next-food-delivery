import AuthContext from '@/context/AuthContext'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function MyRestaurants() {


    const [restaurants, setRestaurants] = useState([])
    const token = Cookies.get("token")

    const getData = useCallback(() => {
        fetch(`http://localhost:3000/api/restaurant/user/`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        })
            .then((res) => res.json())
            .then((json) => setRestaurants(json.data))
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    const deleteRestaurant = async (restaurantId) => {
        await fetch(`http://localhost:3000/api/restaurant/${restaurantId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            }
        })
        getData()
        toast.success("Restoran Silindi.")
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h1 className='text-2xl mb-10 font-bold'>Restoranlarım</h1>
            <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
                <table className=" md:w-full text-md md:text-lg text-center text-gray-500 ">
                    <thead className="text-md md:text-xl text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Restoran Adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Şehir
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ürün ekle
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Siparişler
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sil
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            restaurants.map((restaurant) => (
                                <tr key={restaurant._id} className="bg-white border-b  hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {restaurant.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {restaurant.city.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link href={{ pathname: "addProduct/[restaurantId]", query: { restaurantId: restaurant._id } }}>
                                            <button className="font-medium text-blue-600  hover:underline">Ekle</button>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link href={{ pathname: "orders/[restaurantId]", query: { restaurantId: restaurant._id } }}>
                                            <button className="font-medium text-blue-600  hover:underline">Siparişler</button>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => deleteRestaurant(restaurant._id)} className="font-medium text-blue-600  hover:underline">Sil</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
