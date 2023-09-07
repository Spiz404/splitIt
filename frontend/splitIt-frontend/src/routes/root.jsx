import { Provider } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import store from "../store"

const Root = () => {
  return (
    <>
        <Header/>
   
        <main className="container">
            <Outlet/>
        </main> 
   

        
        <Footer/>
    </>
  )
}
export default Root