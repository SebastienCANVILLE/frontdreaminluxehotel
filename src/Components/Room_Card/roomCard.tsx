import { useState } from 'react';
import { TRoom } from '../../Context/hotel.context';
import './roomCard.css';

/** 
 * * @function RoomCard
 * 
 * * Component enfant permettant d'incrémenter chaque card d'une chambre existante de l'hotel choisi
 * * Component parent hotelCard
 * * Fonction Zoom implémenté pour chaque image de la chambre
*/
export default function RoomCard(props: { room: TRoom }) {

    const [zoomed, setZoomed] = useState(false);

    const handleClick = () => {
        setZoomed(!zoomed);
    };

    // définir la constante en fonction de l'état de "zoomed" 80% prise de largeur de l'écran en zoom et 100% en dézoom initiale
    const zoom = zoomed ? '80%' : '100%';

    return (
        <div className="row-fluid">

            {/* <!-- Img Room Card --> */}
            <div className="card">
                <div className="image-container">
                    <img
                    /*src="/photos/LogoHotel.jpg"*/ src={`/photos/${props.room.name}.jpeg`}
                        className={`card-img-top zoomable ${zoomed ? 'zoomed' : ''}`} // ajouter la classe "zoomed" si "zoomed" est vrai
                        id="image-room"
                        alt="..."
                        style={{ width: zoom }} // changer la taille de l'image en fonction de la constante
                        onClick={handleClick} />
                </div>

                {/* <!-- Title Room Card--> */}
                <div className="card-body">
                    <h6 className="card-titleRoom text-center">{props.room?.name}</h6>
                    <p className="text-center">{props.room.price}€ / nuits </p>
                </div>
            </div>
        </div>
    );
}

