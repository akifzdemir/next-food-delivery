import { createContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    const addToCart = (product) => {
        setProducts([...products, product])
        toast.success(product.name + " sepete eklendi")
    }

    const values = {
        products,
        addToCart
    }

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export default CartContext


