import Card from "./shared/Card"
import { useContext } from "react";
import EcomContext from "../context/EcomContext";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TopSelling() {
  const {topselling, addToCart} = useContext(EcomContext)
  const [state, dispatch] = useContext(AuthContext)
  const redirect = useNavigate()
  const  isAuthenticated = state.accessToken !== null

  const login = ()=>{
    if (!isAuthenticated) {
      redirect('/login')
    }
  }


  return (
    <div className="my-[20px] mx-[5px] lg:mx-[30px]">
        <h1 className="mb-[10px] text-orange-500 font-bold text-2xl text-center lg:pr-[80%]">Top Selling Products</h1>
        <div className="flex lg:gap-7 justify-center gap-5 flex-wrap">
            {topselling.map((item)=>(
                <Card key={item._id}>
                    <Link to={`/details/${item._id}`}><img src={"http://localhost:3000/" + item.img} alt="" className="h-[150px] lg:h-[200px]" /></Link>
                    <p className="font-bold">{item.name}</p>
                    <p>₦{item.price}</p>
                    <button onClick={isAuthenticated ? ()=> addToCart(item._id) : login} className="bg-orange-500 text-white p-[10px] rounded mt-[10]">Add to cart</button>
                </Card>
            ))}
        </div>

    </div>
  )
}

export default TopSelling