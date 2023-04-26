import Destination from '../Components/Modal_Destination/destination';
import Footer from '../Components/Footer/footer';
import Login from '../Components/Login/login';
import Navbar from '../Components/Navbar/navbar';
import Register from '../Components/Register/register';
import Reservation from '../Components/Reservation/reservation';
import ConsultReservations from '../Components/Consult_Reservation/consultReservations';
import './homePage.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/auth.context';

export default function HomePage() {

    const { user } = useContext(AuthContext);

    const [page, setPage] =useState(false);


    return (
        <div className="container-fluid px-0">

            <div>

                <img src="/photos/HomePageBg.jpeg" className="fluid" />

                <Navbar setPage={setPage}></Navbar>
                <Register></Register>
                <Login></Login>
                <Destination></Destination>
                <Reservation></Reservation>
                {page === true && user?.access_token && <ConsultReservations setPage={setPage}></ConsultReservations>}
                <Footer></Footer>

            </div>


        </div>
    );
}