import { useContext } from 'react';
import './cardDestination.css'
import { HotelContext, Thotel } from '../../Context/hotel.context';

/** 
 * @function CardDestination
 *  component enfant permettant d'incrémenter chaque card, d'un hotel existant dans le components parents Card destination
*/
export default function CardDestination(props:{hotel :Thotel}) {

    //const { hotel } = useContext(HotelContext);

    return (

        <div className="row-fluid d-flex justify-content-center">
            <div className="col-md-8 col-12">

                <a href="#" className="btn">
                    <div className="card">
                        <img src="/photos/LogoHotel.jpg" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-titleHotel text-center">{props.hotel.city}</h5>
                        </div>
                    </div>
                </a>

            </div>
        </div>


    )
}