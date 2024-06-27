import sample from "../../assets/Honda-1.jpg"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Details() {
    const param = useParams()
    const carid = param.id
    const {product} = useContext(EcomContext)
    const caritem = product.find((item)=> item._id === carid)
    const {addToCart} = useContext(EcomContext)
    const [state, dispatch] = useContext(AuthContext)
    const redirect = useNavigate()
    const  isAuthenticated = state.accessToken !== null


    const login = ()=>{
      if (!isAuthenticated) {
        redirect('/login')
      }
    }


  return (
    <div className="flex m-[5%] gap-4">
        <div className="w-[50%]">
            <img src={"https://technotronix-backend-0zoz.onrender.com/" + caritem?.img} alt="" />
        </div>
        <div className="w-[50%]">
            <h1 className="text-2xl font-bold border-b-2 mb-5">{caritem?.name}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quaerat fuga necessitatibus quibusdam et suscipit unde iure voluptates, veniam magnam.</p>
            <p className="text-xl font-bold mb-3 mt-5">{caritem?.price}</p>
            <button onClick={isAuthenticated ? ()=> addToCart(item._id) : login} className="bg-orange-500 p-[10px] rounded-md">Add to cart</button>
        </div>
    </div>
  )
}

export default Details