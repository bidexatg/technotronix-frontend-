import Header from "./component/Header"
import Carousel from "./component/Carousel"
import Featured from "./component/Featured"
import TopSelling from "./component/TopSelling"
import Footer from "./component/Footer"
import Products from "./component/pages/Products"
import Details from "./component/pages/Details"
import Cart from "./component/pages/Cart"
import Checkout from "./component/pages/Checkout"
import Alert from "./component/Alert"
import Register from "./component/pages/Register"
import Login from "./component/pages/Login"
import ThanksYou from "./component/pages/ThanksYou"
import { EcomProvider } from "./context/EcomContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import useLocalStorage from "./hook/useLocalStorage"


function App() {
  const {getItem} = useLocalStorage("auth-token")
  const token = getItem()
  let authInitialState = {accessToken: token ?? null}
  
  return (
  <AuthProvider defaultState={authInitialState}>
    <EcomProvider>
      <Router>
        <Header />
        <Alert />
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <Featured />
                <TopSelling />
              </>
            }/>
            <Route path="/products" element={<Products/>} />
            <Route path="/Details/:id" element={<Details/>}/>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/thanksyou" element={<ThanksYou/>}/>
          </Routes>
        <Footer/>
      </ Router>
    </EcomProvider>
  </AuthProvider>
  )
}

export default App
