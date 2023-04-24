import { MdFastfood } from 'react-icons/md'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useContext } from 'react'
import CartContext from '@/context/CartContext'

export default function FoodCard({ product }) {

    const { addToCart } = useContext(CartContext)
    return (
        <div
            className="
                flex flex-row h-32 rounded-lg items-center
                w-1/2
                justify-around
                bg-white  shadow-lg  
               hover:shadow-2xl
               hover:scale-110
               transition-all
               duration-300
               "
        >
            <div className='flex items-center justify-center content-center'>
                <div>
                    <MdFastfood size={"50px"} />
                </div>

            </div>
            <div className="text-center">
                <h3 className='font-semibold text-2xl'>{product.name}</h3>
                <p>
                    {product.description}
                </p>
                <p className='font-light'>
                    {product.price}₺
                </p>

            </div>
            <button onClick={() => addToCart(product)} className='
            bg-pink-600 text-white gap-3 text-center 
            flex font-bold items-center shadow-xl p-5 rounded-md
            '>
                <BsFillCartPlusFill size={"35px"} />
                Sepete ekle
            </button>
        </div>
    )
}