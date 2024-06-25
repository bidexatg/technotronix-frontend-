import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import { Navigate } from "react-router-dom"

function Checkout() {
    const{cartItem, totalAmount, isAuthenticated} = useContext(EcomContext)

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    const handleCheckout = async(e)=>{
        e.preventDefault();

        const amount = totalAmount()
        const currency = "NGN"


        const firstName = e.target.elements.firstName.value
        const lastName = e.target.elements.lastName.value
        const phone = e.target.elements.phone.value
        const address = e.target.elements.address.value
        

        try {
            const res = await fetch("http://localhost:3000/api/payment/intiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({amount, currency, firstName, lastName, phone, address})
            })

            const data = await res.json()
            if (res.ok) {
                window.location.href = data.link 
            }else{
                console.error(data.msg || "Failed to Initiate Payment");
            }
        } catch (error) {
            console.error(error);
        }
    }



  return (
    <div className="flex flex-col lg:flex-row gap-5 m-[5%]">
        <div className="w-[90%] lg:w-[50%]">
        <div>
            <h1 className="font-bold text-center mb-5">Order Summary</h1>
        </div>
         <table className="w-[90%] mx-auto h-[30vh] ">
                <thead>
                    <th>Item</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </thead>
                <tbody className="text-center">
                {cartItem.products?.map((item)=>(
                    <tr key={item._id} className="border-b-2">
                        <td>{item.product.name}</td>
                        <td>
                            <div className="flex justify-center">
                                <img src={"http://localhost:3000/" + item.product.img} className="h-[50px]" alt="" />
                            </div>
                        </td>
                        <td>₦{item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td>₦{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="w-[90%] mx-auto mt-5 flex justify-between">
                <div className="text-4xl font-bold">
                    <h1>Total = {totalAmount()}</h1>
                </div>
            </div>
        </div>
        <div className="w-[90%] lg:w-[50%]">
            <h1 className="mb-3 font-bold text-center">Delivery Information</h1>
            <form onSubmit={(e) => handleCheckout(e)}>
                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="FirstName">First Name</label>
                    <input className="outline outline-1" type="text" name="firstName"/>
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input className="outline outline-1" type="text" name="lastName" />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="phone">Phone NUmber</label>
                    <input className="outline outline-1" type="text" name="phone" />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="Address">Address</label>
                    <textarea name="address" id="" cols="30" rows="10" className="outline outline-1" ></textarea>
                </div>
                <div>
                    <button className="bg-black text-white p-[20px] rounded-md hover:bg-orange-500"> Pay Now</button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Checkout