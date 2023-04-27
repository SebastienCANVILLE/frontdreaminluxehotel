import { useContext, useState } from 'react';
import './navbar.css'
import { AuthContext } from '../../Context/auth.context';

type TProps = {
    setPage: Function
}

export default function Navbar(props: TProps) {

    const { setUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const logOut = () => { setUser(null) }; // const de déconnexion
    const showReservation = () => { 
        props.setPage(true) 
        //setInterval(() => window.location.hash = '#reservations', 200)
        ;
    } // affiche les réservations

    function CloseNav() {
        const [expanded, setExpanded] = useState(false);

        const closeNavbar = () => {
            setExpanded(false);
        };
    }


    return (

        <>

            <nav className="navbar fixed-top">

                <div className="container-fluid px-0 mx-0">

                    <div className="container-fluid row justify-content-between px-0 mx-0 ">

                        <div className="col-md-3 col-12 mt-1 text-center px-0 mx-0">
                            {user?.access_token &&
                                <a className="navbar-brand px-0 mx-0" href="#">Bonjour, {user.user.civility} {user.user.lastname}</a>}
                        </div>

                        <div className="col-md-6 px-0 mx-0">
                            <h2 className="container justify-content-center nav-title px-0 mx-0">DREAMINLUXEHOTEL</h2>
                        </div>

                        <div className="col-md-3 px-0 mx-0">
                            <button className="navbar-toggler float-end me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>

                    </div>

                    {/* show */}
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                        <div className="offcanvas-header">

                            <h2 className="offcanvas-title" id="offcanvasNavbarLabel">DREAMINLUXEHOTEL</h2>

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

                        </div>

                        <div className="offcanvas-body">

                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                {/* <!-- Button My Destinations --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#modaldestination">
                                        Nos destinations
                                    </button>
                                </li>

                                {/* <!-- Buttom Reservation --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#modalreservation">
                                        Réservez votre séjour
                                    </button>
                                </li>

                                {/* <!-- Button Login --> */}
                                {!user?.access_token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black mt-3" data-bs-toggle="modal" data-bs-target="#login">
                                            Se connecter</button>
                                    </li>}

                                {/* <!-- Button Register --> */}
                                {!user?.access_token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#register">
                                            S'enregistrer</button>
                                    </li>}

                                {/* <!-- Button Profil --> */}
                                {user?.access_token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black mt-3">Profil</button>
                                    </li>}

                                {/* <!-- Button My reservation --> */}
                                {user?.access_token &&
                                    <li className="nav-item">
                                        <a type="button" className="btn btn-link text-black" href="#reservations" onClick={showReservation} data-bs-dismiss="offcanvas">
                                            Mes réservations
                                        </a>
                                    </li>}

                                {/* <!-- Button Contact --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black mt-3">
                                        Contact</button>
                                </li>

                                {/* <!-- Button Logout --> */}
                                {user?.access_token &&
                                    <li className="nav-item mt-5">
                                        <button type="button" className="btn btn-link" id="deconnexion" onClick={logOut}>
                                            Déconnexion</button>
                                    </li>}

                                {/* <!-- Gestion Systeme Button Panel ADMIN --> */}
                                {user?.access_token && user?.user.role === "admin" && <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Admin</button>
                                </li>}

                                {/* <!-- Gestion Systeme Button Panel CONSULTANT--> */}
                                {user?.access_token && user?.user.role !== "user" && <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Consultant</button>
                                </li>}

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}

