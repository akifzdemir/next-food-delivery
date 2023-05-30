import Cookies from "js-cookie"
import { useCallback, useEffect, useState } from "react"

export default function Orders() {
    const [orders, setOrders] = useState([])
    const token = Cookies.get("token")

    const getData = useCallback(() => {
        fetch(`http://localhost:3000/api/order/user/`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        })
            .then((res) => res.json())
            .then((json) => setOrders(json.data))
    }, [])

    useEffect(() => {
        getData()
        console.log(orders)
    }, [getData])
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <h1 className='text-2xl mb-10 font-bold'>Siparişlerim</h1>
            <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-xl text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ürün
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Restoran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Durum
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <tr key={order._id} className="bg-white border-b  hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {order.product.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.restaurant.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {order.status}
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
