import AuthContext from '@/context/AuthContext'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function MyRestaurants() {


    const [restaurants, setRestaurants] = useState([])
    const token = Cookies.get("token")

    useEffect(() => {
        fetch(`http://localhost:3000/api/restaurant/user/`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        })
            .then((res) => res.json())
            .then((json) => setRestaurants(json.data))
        console.log(restaurants)
    }, [token])

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-lg text-left text-gray-500 ">
                    <thead className="text-xl text-gray-700 uppercase bg-gray-50">
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
                                Düzenle
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
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {restaurant.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {restaurant.city.name}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={{ pathname: "addProduct/[restaurantId]", query: { restaurantId: restaurant._id } }}>
                                            <button className="font-medium text-blue-600  hover:underline">Ekle</button>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-blue-600  hover:underline">Düzenle</button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-blue-600  hover:underline">Sil</button>
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
