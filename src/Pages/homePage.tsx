import Destination from '../Components/Destination/destination';
import Footer from '../Components/Footer/footer';
import Login from '../Components/Login/login';
import Navbar from '../Components/Navbar/navbar';
import Register from '../Components/Register/register';
import Reservation from '../Components/Reservation/reservation';
import ConsultReservations from '../Components/Consult_Reservation/consultReservations';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/auth.context';
import Profil from '../Components/Profil/profil';
import './homePage.css'
import Comment from '../Components/Comment/comment';

export default function HomePage() {

    const { user } = useContext(AuthContext);

    const [page, setPage] =useState(false);
    const [profil, setProfil] =useState(false);


    return (
        <div className="container-fluid px-0">

            <div>               

                <Navbar setPage={setPage} setProfil={setProfil}></Navbar>
                <Comment></Comment>
                <Register></Register>
                <Login></Login>
                {profil === true && user?.access_token && <Profil setProfil={setProfil}></Profil>}
                {page === true && user?.access_token && <ConsultReservations setPage={setPage}></ConsultReservations>}
                <img src="/photos/HomePageBg.jpeg" className="fluid" />
                <Destination></Destination>
                <Reservation></Reservation>
                <Footer></Footer>

            </div>


        </div>
    );
}