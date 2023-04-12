import { useContext } from 'react';
import './navbar.css'
import { AuthContext } from '../../Context/auth.context';

export default function Navbar() {

    const { setUser } = useContext(AuthContext);

    const lastname = useContext(AuthContext).user?.user.lastname; // récupération du lastname de l'user connecté
    const civility = useContext(AuthContext).user?.user.civility; // récupération du firstname de l'user connecté
    const role = useContext(AuthContext).user?.user.role; // récupération du firstname de l'user connecté
    const token = useContext(AuthContext).user?.access_token // récupération de l'access_token

    const logOut = () => { setUser(null) }; // const de déconnexion

    return (

        <>

            <nav className="navbar fixed-top">

                <div className="container-fluid px-0 mx-0">

                    {/* <h2 className="container d-flex justify-content-center nav-title">DREAMINLUXEHOTEL</h2>
                    { token  &&
                        <a className="navbar-brand" href="#">Bonjour {firstname} {lastname}</a>}


                    <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}

                    <div className="container-fluid row justify-content-between px-0 mx-0 ">

                        <div className="col-md-3 col-12 mt-1 text-center px-0 mx-0">
                            {token &&
                                <a className="navbar-brand px-0 mx-0" href="#">Bonjour, {civility} {lastname}</a>}
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


                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                        <div className="offcanvas-header">

                            <h2 className="offcanvas-title" id="offcanvasNavbarLabel">DREAMINLUXEHOTEL</h2>

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

                        </div>

                        <div className="offcanvas-body">

                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                {/* <!-- Button My Reservation --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#modaldestination">
                                        Nos destinations
                                    </button>
                                </li>

                                {/* <!-- Button Check Reservation --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">
                                        <i className="bi bi-cart"> Panier réservation</i>
                                    </button>
                                </li>

                                {/* <!-- Button Login --> */}
                                {!token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#login">Se connecter</button>
                                    </li>}

                                {/* <!-- Button Register --> */}
                                {!token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#register">S'enregistrer</button>
                                    </li>}

                                {/* <!-- Button Profil --> */}
                                {token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black">Profil</button>
                                    </li>}

                                {/* <!-- Button Commande --> */}
                                {token &&
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-link text-black">Mes réservations</button>
                                    </li>}

                                {/* <!-- Button Contact --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Contact</button>
                                </li>

                                {/* <!-- Button Logout --> */}
                                {token &&
                                    <li className="nav-item mt-5">
                                        <button type="button" className="btn btn-link" id="deconnexion" onClick={logOut}>Déconnexion</button>
                                    </li>}

                                {/* <!-- Gestion Systeme Button Panel ADMIN --> */}
                                {token && role === "admin" && <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Admin</button>
                                </li>}

                                {/* <!-- Gestion Systeme Button Panel CONSULTANT--> */}
                                {token && role !== "user" && <li className="nav-item">
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






{/* <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top d-flex justify-content-between">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation" >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <a className="nav-link" href="#">
                            Accueil
                        </a>

                        <a className="nav-link" href="#">
                            <i className="bi bi-cart"></i>
                        </a>
                    </div>
                </div>

                <h2 className="titre-nav ">DREAMINLUXEHOTEL</h2>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <div className="navbar-nav">

                        <a className="nav-link px-0" href="#"> Se Connecter </a>
                        <a className="nav-link" href="#"> S'enregister </a>

                    </div>
                </div>

            </nav> */}