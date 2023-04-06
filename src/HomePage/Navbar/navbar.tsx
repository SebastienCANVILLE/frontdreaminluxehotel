import './navbar.css'

export default function Navbar() {

    return (

        <>

            <nav className="navbar fixed-top">

                <div className="container-fluid">


                    <h2 className="container d-flex justify-content-center nav-title">DREAMINLUXEHOTEL</h2>


                    <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                        <div className="offcanvas-header">

                            <h2 className="offcanvas-title" id="offcanvasNavbarLabel">DREAMINLUXEHOTEL</h2>

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

                        </div>

                        <div className="offcanvas-body">

                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                {/* <!-- Button Check Reservation --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">
                                        <i className="bi bi-cart"> Ma réservation</i>
                                    </button>
                                </li>

                                {/* <!-- Button Login --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#login">Se connecter</button>
                                </li>

                                {/* <!-- Button Register --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black" data-bs-toggle="modal" data-bs-target="#register">S'enregistrer</button>
                                </li>                    

                                {/* <!-- Button Profil --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Profil</button>
                                </li>

                                {/* <!-- Button Commande --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Mes commandes</button>
                                </li>

                                {/* <!-- Button Contact --> */}
                                <li className="nav-item">
                                    <button type="button" className="btn btn-link text-black">Contact</button>
                                </li>

                                {/* <!-- Button Logout --> */}
                                <li className="nav-item mt-5">
                                    <button type="button" className="btn btn-link" id="deconnexion">Déconnexion</button>
                                </li>

                                {/* <!-- Gestion Systeme --> */}
                                <li className="nav-item dropdown">

                                    <a className="nav-link dropdown-toggle mt-5 text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Gestion
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Admin</a></li>
                                        <li><a className="dropdown-item" href="#">Consultant</a></li>
                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>

                                    </ul>
                                </li>

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