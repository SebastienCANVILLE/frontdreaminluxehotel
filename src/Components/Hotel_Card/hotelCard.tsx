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



    return (

        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-12 pe-0 ps-0">

                <div className="card">
                    <img src="/photos/LogoHotel.jpg" className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-titleHotel text-center">{props.hotel.name_hotel}</h5>
                    </div>
                </div>

                {/* <!-- Buttom Caroussel --> */}
                <div className="btn-carrou pt-3 d-flex justify-content-center">

                    {/* <!-- Buttom prev --> */}
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

                {/* Btn Reservation 1 */}
                <div className="col-12 d-flex justify-content-center mt-2 mb-2 pt-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalreservation">Réserver</button>
                </div>

            </div>

            {/*Details */}
            <div className="card-details">
                <div className="row">

                    <h2 className='titleRoom d-flex justify-content-center text-center mt-5'>
                        --- Nos chambres ---</h2>

                    {/* récupération des props et du nouveau typage de Troom inclus dans le typage Thotel */}
                    {props.hotel.rooms.map((item) =>
                        <div className="col-md-4 col-12 mt-5 mb-3" key={item.id}>
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

                    {/* Btn Reservation 2 */}
                    <div className="col-12 d-flex justify-content-center mt-2 mb-2">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalreservation">Réserver</button>
                    </div>

                </div>
            </div>

        </div>

    )
}