import { useContext, useEffect } from "react"
import EcomContext from "../../context/EcomContext"
import { useSearchParams } from "react-router-dom"


function ThanksYou() {
  const {createOrder} = useContext(EcomContext)
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")


  useEffect(()=>{
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref )
    }
  }, [transaction_id, tx_ref, createOrder])

  return (
    <div className="w-[50%] mx-auto m-11">
        <img src="img/thanks.png" alt="" className="w-200px" />
        <p>Thank you for purchase, a representative will get back to you shortly</p>
        <button className="p-3 rounded bg-orange-500">Manage Orders</button>
    </div>
  )
}

export default ThanksYou