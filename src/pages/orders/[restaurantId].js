import Modal from "@/components/Modal";
import Cookies from "js-cookie"
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { GiCancel } from 'react-icons/gi'
import { toast } from "react-toastify";

export default function RestaurantOrders() {
    const [orders, setOrders] = useState([])
    const token = Cookies.get("token")
    const router = useRouter();
    const { restaurantId } = router.query

    const getData = useCallback(() => {
        if (restaurantId !== undefined) {
            fetch(`http://localhost:3000/api/order/restaurant/${restaurantId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                }
            })
                .then((res) => res.json())
                .then((json) => setOrders(json.data))
        }
    }, [restaurantId])

    const handleStatus = (id, value) => {
        console.log(id)
        fetch(`/api/order/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }).then(response => {
            if (response.ok) {
                toast.success("Başarılı")
                getData()
            }

        })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [getData])
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="relative h-3/4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-xl text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ürün
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kullanıcı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ürün Durumu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tarih
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kabul Et
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reddet
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Teslim Edildi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                order.user &&
                                <tr key={order._id} className="bg-white border-b  hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {order.product.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Modal user={order.user} />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {order.status}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {new Date(order.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button disabled={order.status !== "Bekliyor"} onClick={() => handleStatus(order._id, "Hazırlanıyor")} className='bg-green-500 disabled:opacity-25 text-white p-2 rounded-md'><BsFillCheckSquareFill /></button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button disabled={order.status !== "Bekliyor"} onClick={() => handleStatus(order._id, "Reddedildi")} className='bg-red-600 disabled:opacity-25 text-white p-2 rounded-md'><GiCancel /></button>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <button disabled={order.status !== "Hazırlanıyor"} onClick={() => handleStatus(order._id, "Teslim edildi")} className='bg-green-500 disabled:opacity-25 text-white p-2 rounded-md'><BsFillCheckSquareFill /></button>
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


