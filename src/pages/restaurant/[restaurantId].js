import FoodCard from '@/components/FoodCard';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Restaurant() {

    const router = useRouter();
    const { restaurantId } = router.query
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (restaurantId !== undefined) {
            fetch(`http://localhost:3000/api/product/restaurant/${restaurantId}`)
                .then((res) => res.json())
                .then((json) => setProducts(json.data))
        }

    }, [restaurantId])

    return (
        <div className='flex flex-col h-full gap-10 items-center mt-20 mb-10'>
            <h1 className='text-xl font-bold'> Ürünler :</h1>
            {
                products.map((product) => (
                    <FoodCard key={product._id} product={product} />
                ))
            }
        </div>
    )
}
