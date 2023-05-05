import { useContext } from 'react';
import { HotelContext, THotel } from '../../Context/hotel.context';
import RoomCard from '../Room_Card/roomCard';
import { CommentView } from '../Comment/viewcomments';
import { AuthContext } from '../../Context/auth.context';
import './hotelCard.css'


/** 
 * @function HotelCard
 * 
 * * Component enfant permettant d'incrémenter chaque card, d'un hotel existant dans le components parents modal_destination.
 * * Récupère les card des chambres de l'hôtel via le composant enfant roomCard
 * * Elle s'occupe également d'afficher le détail de l'hôtel
*/
export default function HotelCard(props: { hotels: THotel }) {

const {hotel, setHotel} = useContext(HotelContext)
const {user, setUser} = useContext(AuthContext)

function deleteComment(id: number) {
const comment = user!.user.comments.filter(item => item.id !== id);
    user!.user.comments = comment;
    setUser({ ...user!});
    /* const commentAdmin = hotel!.comments.filter(item => item.id !== id);
    hotel!.comments = commentAdmin;
    setHotel({ ...hotel!}); */
}

    return (

        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-12 pe-0 ps-0">

                <div className="card">
                    <img src="/photos/LogoHotel.jpg" className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-titleHotel text-center">{props.hotels.name_hotel}</h5>
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

                    <h2 className='titleRoom d-flex justify-content-center text-center mt-3'>Les chambres</h2>

                    {/* récupération des props et du nouveau typage de Troom inclus dans le typage Thotel */}
                    {props.hotels.rooms.map((item) =>
                        <div className="col-md-4 col-12 mt-3 mb-3" key={item.id}>
                            <RoomCard room={item}></RoomCard>
                        </div>)}

                    {/* Title Contact */}
                    <h5 className='contact d-flex justify-content-center text-center mt-4'>Contactez-nous :</h5>

                    {/* <P> Contact */}
                    <div className="col-12 d-flex justify-content-center text-center">
                        <p>{props.hotels.adress_line} <br />
                            {props.hotels.zipCode} {props.hotels.city} <br />
                            {props.hotels.phone_number}
                        </p>
                    </div>

                    {/* Btn Reservation 2 */}
                    <div className="col-12 d-flex justify-content-center mt-2 mb-2">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalreservation">Réserver</button>
                    </div>

                    {/* Comments 
                    <h5 className='contact d-flex justify-content-center text-center mt-4'>Commentaires :</h5>
                    {hotel?.comments?.map((item) =>
                    <div className="col-12 d-flex justify-content-center text-center" key={item.id}>
                        <p >{item.clientName}<br/>
                        {item.commentary}</p> 
                        
                    </div>)}*/}

                    {/* Comments */}
                    <h1 className="destination-title text-center mt-3 mb-3 px-0" id="staticBackdropLabel">Ils nous ont laissé un commentaire sur leur séjour</h1>
                    {props.hotels.comments.map((item) =>
                    <div className="col-12 d-flex justify-content-center text-center" key={item.id}>
                        <CommentView del={deleteComment} comments={item}></CommentView> 
                        
                    </div>)}

                </div>
            </div>

        </div>

    )
}