import { createContext, useState, useEffect, useContext  } from "react";
import { products, carousel } from "../data/EcomData";
import useAlert from "../hook/useAlert";
import AuthContext from "./AuthContext";

const EcomContext = createContext();

export const EcomProvider = ({ children }) => {
    const [state, dispatch] = useContext(AuthContext)
    const [product, setProduct] = useState([]);
    const [slide, setSlide] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState([])
    const { showAndHide, alertInfo } = useAlert();
    const [order, setOrder] = useState([])

    const isAuthenticated = state.accessToken !== null

    useEffect(() => {
        fetchProduct()
        fetchCarousel()
        fetchCart()

    }, []);

    useEffect(() => {
        const count = cartItem.products?.reduce(
            (total, item) => total + item.quantity, 
        0)

        setCartCount(count)
    }, [cartItem])

    // const getCartCount = ()=>{
    //     if (!cartItem || !cartItem.products) {
    //         return 0;
    //     } else{
    //         return cartItem.products.reduce((total, item)=> total + item.quantity, 0)
    //     }
    // }

    const featured = product.filter((item) => item.featured === true);
    const topselling = product.filter((item) => item.topSelling === true);

    const fetchProduct = async () => {
        const response = await fetch("https://technotronix-backend-0zoz.onrender.com/api/product")
        const data = await response.json()
        setProduct(data)
    }

    const fetchCarousel = async () => {
        const response = await fetch("https://technotronix-backend-0zoz.onrender.com/carousel")
        const data = await response.json()
        setSlide(data)
    }

    const addToCart = async (productId) => {
        // const existingItemIndex = cartItem.findIndex(
        //     (item) => item.id === prod.id
        // );
        // if (existingItemIndex !== -1) {
        //     const updatedCartItem = [...cartItem];
        //     const itemToUpdate = updatedCartItem[existingItemIndex];
        //     itemToUpdate.quantity += prod.quantity;
        //     itemToUpdate.amount = itemToUpdate.price * itemToUpdate.quantity;
        //     showAndHide("error", "item already exist in cart")
        // } else{
        //     setCartItem([...cartItem, {...prod, amount: prod.price * prod.quantity}])
        //     showAndHide("success", "item added to cart")
        // }

        try {
            const res = await fetch("https://technotronix-backend-0zoz.onrender.com/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({ productId, quantity: 1 }),
            });

            if (!res.ok) {
                throw new Error("Somthing went wrong")
            }

            const data = await res.json();
            setCartItem(data);
            showAndHide("sucess", "item added to cart")
        } catch (error) {
            console.log(error.message);
            showAndHide("error", "Failed to add to cart")
        }
    };

    const fetchCart = async () => {
        try {
            const res = await fetch("https://technotronix-backend-0zoz.onrender.com/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
            });

            if (!res.ok) {
                throw new Error("Something went wrong")
            }

            const data = await res.json();
            setCartItem(data)
        } catch (error) {
            console.error("Error getting cart", error);
        }
    }

    const updateQuantity = async (productId, quantity) => {
        if (!quantity > 0) {
            showAndHide("error", "quantity cannot be less than 1")
            return;
        }
        try {
            const res = await fetch("https://technotronix-backend-0zoz.onrender.com/update-quantity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({ productId, quantity }),
            })

            const data = await res.json();
            if (res.ok) {
                const existingItemIndex = cartItem.products?.findIndex((item) => item.product._id === productId);
                const updatedCartItem = [...cartItem.products];
                const itemToUpdate = updatedCartItem[existingItemIndex];
                itemToUpdate.quantity = quantity;
                itemToUpdate.amount = itemToUpdate.product.price * itemToUpdate.quantity;
                setCartItem({ ...cartItem, product, updatedCartItem })
                console.log(data);
            } else {
                console.error(data.msg || "Failed to update quantity");
            }
        } catch (error) {
            console.error(error);
        }


    }

    const removeItem = async (productId) => {
        try {
            const res = await fetch("https://technotronix-backend-0zoz.onrender.com/remove-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({ productId })
            })

            const data = await res.json()
            if (res.ok) {
                showAndHide("success", "item removed from cart")
                setCartItem(data)
            } else {
                console.error(data.msg || "failed to remove item");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const totalAmount = () => {
        return cartItem.products?.reduce((total, item) => total + item.amount, 0)
    }

    // const handleCheckout = async()=>{
    //     const amount = totalAmount()
    //     const currency = "NGN"

    //     try {
    //         const res = await fetch("https://technotronix-backend-0zoz.onrender.com/api/payment/intiate", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "auth-token": `${localStorage.getItem("auth-token")}`,
    //             },
    //             body: JSON.stringify({amount, currency})
    //         })

    //         const data = await res.json()
    //         if (res.ok) {
    //             window.location.href = data.link 
    //         }else{
    //             console.error(data.msg || "Failed to Initiate Payment");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    const createOrder = async (transaction_id, orderId) => {
        try {
            const response = await fetch("https://technotronix-backend-0zoz.onrender.com/api/payment/verify", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({ transaction_id, orderId }),
                credentials: "include"
            })

            const data = await response.json()
            if (res.ok) {
                setOrder(data.order)
                setCartItem([])
            } else {
                console.error(data.msg);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <EcomContext.Provider value={{ featured, topselling, product, slide, addToCart, cartItem, updateQuantity, removeItem, totalAmount, showAndHide, alertInfo, cartCount, createOrder, isAuthenticated }} >
            {children}
        </EcomContext.Provider>
    )
}
export default EcomContext

