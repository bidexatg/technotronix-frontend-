import { MdDelete } from "react-icons/md";
import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import { Link, Navigate } from "react-router-dom";



function Cart() {
    const { cartItem, updateQuantity, removeItem, totalAmount, isAuthenticated } = useContext(EcomContext)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }


    const cartTable = (
        <>
            <table className="w-[90%] mx-auto h-[30vh]">
                <thead>
                    <th>Action</th>
                    <th>Item</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </thead>
                <tbody className="text-center">
                    {cartItem.products?.map((item) => (
                        <tr className="border-b-2" key={item.product._id}>
                            <td>
                                <div>
                                    <button onClick={() => removeItem(item.product._id)}><MdDelete className="text-orange-500 text-[20px] " /></button>
                                </div>
                            </td>
                            <td>{item.product.name}</td>
                            <td>
                                <div className="flex justify-center">
                                    <img src={"https://technotronix-backend-0zoz.onrender.com/" + item.product.img} className="h-[50px]" alt="" />
                                </div>
                            </td>
                            <td>{item.product.price}</td>
                            <td><input type="number" className="outline outline-1 w-[50px] " value={item.quantity} min={1} onChange={(e) => updateQuantity(item.product._id, e.target.value)}  /></td>
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-[90%] mx-auto mt-5 flex justify-between">
                <div className="text-4xl font-bold">
                    <h1>Total = ₦{totalAmount()}</h1>
                </div>
                <div>
                    <Link to="/checkout"><button className="bg-orange-500 text-white p-[10px] rounded-md">Checkout</button></Link>
                </div>
            </div>
        </>
    )


    return (
        <div className="m-[5%]">
            <h1 className="text-2xl font-bold text-center mb-10">Your Shop Cart</h1>
            {cartItem.products?.length > 0 ? cartTable : <h1 className="text-center font-bold">No items in cart</h1>}
        </div>
    );
}

export default Cart