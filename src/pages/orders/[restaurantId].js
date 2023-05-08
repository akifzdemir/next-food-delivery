import Cookies from "js-cookie"
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"

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

    useEffect(() => {
        getData()
        console.log(restaurantId)

    }, [getData])
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-xl text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ürün
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kullanıcı Adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kullanıcı Mail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ürün Durumu
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
                                    <td className="px-6 py-4">
                                        {order.user.firstName} {order.user.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {order.user.email}
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
