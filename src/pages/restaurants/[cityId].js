import Card from '@/components/Card';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Restaurants() {

    const router = useRouter();
    const { cityId } = router.query
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        if (cityId !== undefined) {
            fetch(`http://localhost:3000/api/restaurant/city/${cityId}`)
                .then((res) => res.json())
                .then((json) => setRestaurants(json.data))
        }
    }, [cityId])

    return (
        <div className='flex h-screen items-center justify-center'>
            {
                restaurants.map((restaurant) => (
                    <Card name={restaurant.name} address={restaurant.address} />
                ))
            }
        </div>
    )
}
