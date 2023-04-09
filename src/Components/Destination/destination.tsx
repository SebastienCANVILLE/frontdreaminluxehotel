import HotelCard from '../Hotel Card/hotelCard'
import './destination.css'

export default function Destination() {

    return (

        <>

            {/* <!-- Buttom Trigger Modal --> */}
            <div className="container-fluid btn-destPos d-flex justify-content-center">
                <button type="button" className="btn-destination btn align-items-center " data-bs-toggle="modal" data-bs-target="#modaldestination">
                    Nos destinations
                </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modaldestination" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title container d-flex justify-content-center fs-5" id="staticBackdropLabel">Nos destinations</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body-fluid">

                            {/* <!-- Carousel --> */}
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">

                                    <div className="carousel-item active">
                                        <HotelCard></HotelCard>
                                    </div>

                                    <div className="carousel-item">
                                        <HotelCard></HotelCard>
                                    </div>

                                </div>

                                {/* <!-- Buttom previous --> */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                {/* <!-- Buttom next --> */}
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Fermer</button>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}