import { Provider } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import App from "../App.jsx"
import store from "../store"
// import '../index.css'
const Root = () => {
  return (
    <>
        <Header/>
   
        {/* <main className="container">
            <Outlet/>
        </main>  */}
          <App/>

        <Footer/>
    </>
  )
}
export default Root