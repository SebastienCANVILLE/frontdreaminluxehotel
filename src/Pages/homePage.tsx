import Destination from '../Components/Modal_Destination/destination';
import Footer from '../Components/Footer/footer';
import Login from '../Components/Login/login';
import Navbar from '../Components/Navbar/navbar';
import Register from '../Components/Register/register';
import './homePage.css'

export default function HomePage() {

    return (
        <div className="container-fluid px-0">

            <div>

                <img src="/photos/HomePageBg.jpeg" className="img-fluid" />

                <Navbar></Navbar>
                <Register></Register>
                <Login></Login>
                <Destination></Destination>
                <Footer></Footer>

            </div>


        </div>
    );
}