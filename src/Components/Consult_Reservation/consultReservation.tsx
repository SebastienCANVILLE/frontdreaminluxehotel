import { useContext } from 'react'
import './consultReservation.css'
import { AuthContext } from '../../Context/auth.context'

export default function ConsultReservation() {

    //const reference = useContext(AuthContext).user?.user.reservations[0].reference
    //const hotel = useContext(AuthContext).user?.user.reservations[0].hotel.name_hotel
    //const room = useContext(AuthContext).user?.user.reservations[0].room.name
    //const arrivalDate= useContext(AuthContext).user?.user.reservations[0].arrival_date
    //const departureDate= useContext(AuthContext).user?.user.reservations[0].departure_date

    const {user} =  useContext(AuthContext); 


    return (

        <>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="consultReservation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">

                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Mes réservations</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        {/* <!-- Modal Body --> */}
                        <div className="modal-body">

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th scope="col">Référence</th>
                                        <th scope="col">Hotel</th>
                                        <th scope="col">Chambre</th>
                                        <th scope="col">Date d'arrivée</th>
                                        <th scope="col">Date de départ</th>
                                        <th scope="col">Prix</th>                                        
                                    </tr>
                                </thead>

                                <tbody className="table-group-divider">

                                </tbody>

                            </table>
                        </div>

                        {/* <!-- Modal Footer --> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>

                    </div>
                </div>
            </div>

        </>

    )


}