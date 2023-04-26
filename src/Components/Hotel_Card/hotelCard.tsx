import { useState } from 'react';
import { THotel } from '../../Context/hotel.context';
import RoomCard from '../Room_Card/roomCard';
import './hotelCard.css'

/** 
 * @function HotelCard
 * 
 * * Component enfant permettant d'incrémenter chaque card, d'un hotel existant dans le components parents modal_destination.
 * * Récupère les card des chambres de l'hôtel via le composant enfant roomCard
 * * Elle s'occupe également d'afficher le détail de l'hôtel
*/
export default function HotelCard(props: { hotel: THotel }) {

    // const permettant d'ouvrir et fermer la partie détails de HotelCArd
    const [showDetails, setShowDetails] = useState(false);

    const OpenDetails = () => {//permet d'ouvrir et de fermer directement depuis le btn a href
        setShowDetails(!showDetails);
    }

    const CloseDetails = () => {
        setShowDetails(false);
    }

    return (

        <div className="row-fluid d-flex justify-content-center">
            <div className="col-md-8 col-12">

                {/* Btn Card Hotel*/}
                <a href="#" className="btn mt-3 mb-3" onClick={OpenDetails}>

                    <div className="card" onClick={CloseDetails}>
                        <img src="/photos/LogoHotel.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-titleHotel text-center">{props.hotel.name_hotel}</h5>
                        </div>
                    </div>

                </a>

                {/* Open Details */}
                {showDetails &&
                    <div className="card-details">
                        <div className="row">

                            <h2 className='titleRoom d-flex justify-content-center text-center mt-4'>Nos chambres</h2>

                            {/* récupération des props et du nouveau typage de Troom inclus dans le typage Thotel */}
                            {props.hotel.rooms.map((item) =>
                                <div className="col-md-6 col-12 mt-3" key={item.id}>
                                    <RoomCard room={item}></RoomCard>
                                </div>)}

                            {/* Title Contact */}
                            <h5 className='d-flex justify-content-center text-center mt-4'>Contactez-nous :</h5>

                            {/* <P> Contact */}
                            <div className="col-12 d-flex justify-content-center text-center">
                                <p>{props.hotel.adress_line} <br />
                                    {props.hotel.zipCode} {props.hotel.city} <br />
                                    {props.hotel.phone_number}
                                </p>
                            </div>

                            {/* Btn Close */}
                            <div className="col-12 d-flex justify-content-center mt-2 mb-2">
                                <button className="btn btn-primary" onClick={CloseDetails}>Fermer le détail</button>
                            </div>

                        </div>
                    </div>
                }

            </div>
        </div>


    )
}