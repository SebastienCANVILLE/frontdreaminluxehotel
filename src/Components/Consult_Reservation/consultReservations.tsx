import { useContext } from 'react'
import { AuthContext } from '../../Context/auth.context'
import ConsultReservation from './consultReservation';
import './consultReservation.css'

type TProps = {
    setPage: Function
}
export default function ConsultReservations(props: TProps) {

    const { user } = useContext(AuthContext);
    const closeMyReservation = () => { props.setPage(false) } // ferme le composant

    return (

        <>

            <div className="container-fluid contRes text-center pt-3 pb-5 mb-5" id="reservations">

                <h4 className="resConsTitle">Mes réservations</h4>

                <div className="table pt-3">

                    <table className="table table-layout-fixed">

                        <colgroup>
                            <col className="col-3" />
                            <col className="col-3" />
                            <col className="col-3" />
                            <col className="col-3" />
                        </colgroup>

                        <thead>
                            <tr>
                                <th scope="col">Référence</th>
                                <th scope="col">Arrivée</th>
                                <th scope="col">Départ</th>
                                <th scope="col">Prix</th>
                            </tr>
                        </thead>

                        {user?.user.reservations.map(((item) =>

                            <tbody className="table-group-divider" key={item.id}>

                                <ConsultReservation reservation={item}></ConsultReservation>

                            </tbody>))}

                    </table>

                    <button type="button" className="btn btn-dark mb-2 mt-2 align-items-center float-end"
                        onClick={closeMyReservation}>Fermer</button>

                </div>
            </div>

        </>

    )


}




{/* <!-- Modal --> 
            <div className="modal fade" id="consultReservation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">

                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Mes réservations</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>*/}

{/* <!-- Modal Body --> 
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

                                    <tr>
                                        <td scope="col">{user?.user.reservations[0].reference}</td>
                                        <td scope="col">Hotel</td>
                                        <td scope="col">Chambre</td>
                                        <td scope="col">{user?.user.reservations[0].arrival_date}</td>
                                        <td scope="col">{user?.user.reservations[0].departure_date}</td>
                                        <td scope="col">{user?.user.reservations[0].totalPrice}</td>                                        
                                    </tr>

                                </tbody>

                            </table>

                        </div>*/}

{/* <!-- Modal Footer --> 
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>

                    </div>
                </div>
            </div>*/}