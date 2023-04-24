import CartContext from "@/context/CartContext"
import Cookies from "js-cookie"
import { useContext } from "react"

export default function Cart() {

    const { products } = useContext(CartContext)
    const token = Cookies.get("token")

    const handleOrder = async () => {

        const orderData = products.map((product) => {
            return {
                product: product._id,
                restaurant: product.restaurant._id
            }
        })

        await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        }).then(response => {
            if (response.ok) {
                console.log('Sipariş verildi!')
            } else {
                console.log('Sipariş verilirken bir hata oluştu.')
            }
        })

    }

    return (
        <div className='flex gap-5 flex-col h-screen justify-center items-center'>
            <h1 className="text-2xl font-bold">Sepetim</h1>
            <div className="relative h-1/2 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-xl text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ürün Adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Restoran Adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fiyat
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={i} className="bg-white border-b  hover:bg-gray-50">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.restaurant.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {product.price}₺
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' onClick={() => handleOrder()} type="submit">Sipariş ver</button>

        </div>
    )
}