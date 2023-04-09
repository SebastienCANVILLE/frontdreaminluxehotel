import './hotelCard.css'

export default function RoomCard() {


    return (

        <div className="row-fluid d-flex justify-content-center">
            <div className="col-md-8 col-12">

                <a href="#" className="btn">
                    <div className="card">
                        <img src="/photos/LogoHotel.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-titleHotel text-center">Nom de la chambre</h5>
                        </div>
                    </div>
                </a>

            </div>
        </div>


    )
}