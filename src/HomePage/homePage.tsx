import Footer from './Footer/footer';
import Login from './Login/login';
import Navbar from './Navbar/navbar';
import Register from './Register/register';
import './homePage.css'

export default function HomePage() {

    return (
        <div className="container-fluid px-0">

            <div>

                <img src="/photos/HomePageBg.jpeg" className="img-fluid" />

                <Navbar></Navbar>
                <Register></Register>
                <Login></Login>
                <Footer></Footer>


            </div>


        </div>
    );
}