import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const { auth } = useContext(AuthContext)

    const addToCart = (product) => {
        if (auth) {
            setProducts([...products, product])
            toast.success(product.name + " sepete eklendi")
        } else {
            toast.error("Giriş yapmalısınız")
        }
    }

    const values = {
        products,
        addToCart
    }

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export default CartContext


