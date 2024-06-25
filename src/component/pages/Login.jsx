import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import EcomContext from "../../context/EcomContext"
import useLocalStorage from "../../hook/useLocalStorage"



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, dispatch] = useContext(AuthContext)
    const {showAndHide} = useContext(EcomContext)
    const {setItem} = useLocalStorage("auth-token")

    const isAuthenticated = state.accessToken !== null

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    const redirect = useNavigate();

    const loginHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({email, password}),
            })
            const data = await res.json();

            if (data === "Invalid password/username") {
                showAndHide("error", "Invalid password/username")
            }else {
                dispatch({type: "setToken", payload: data.token})
                setItem(data.token)
                redirect("/")
                showAndHide("success", "Login Successful!!!")
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
         <div className="w-[30%] mx-auto my-[9%]">
            <h1 className="mb-5 font-bold text-center text-2xl">Login Here</h1>
            <form onSubmit={loginHandler}>
                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="Email">Email</label>
                    <input className="outline outline-1" type="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                    <label htmlFor="phone">Password</label>
                    <input className="outline outline-1" type="password"  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className="bg-black text-white p-[20px] rounded-md hover:bg-orange-500"> Sign In</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login