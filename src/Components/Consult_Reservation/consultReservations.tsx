import { useContext } from 'react'
import { AuthContext } from '../../Context/auth.context'
import ConsultReservation from './consultReservation';
import './consultReservation.css'

type TProps = {
    setPage: Function
}
export default function ConsultReservations(props: TProps) { // props pour l'utilisation de la fermeture du ConsultReservations via le bouton

    const { user, setUser } = useContext(AuthContext);

    const closeMyReservation = () => { props.setPage(false) } // ferme le composant

    function deleteReservation(id: number) {
        const reservation = user!.user.reservations.filter(item => item.id !== id);
        user!.user.reservations = reservation;
        setUser({ ...user!});
    }

    return (

            <div className="contRes text-center pt-3 pb-5 mb-3" id="reservations" >

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

                                <ConsultReservation del={deleteReservation} reservation={item}></ConsultReservation>

                            </tbody>))}

                    </table>

                    <button type="button" className="btn btn-dark mb-2 mt-3 me-2 align-items-center float-end"
                        onClick={closeMyReservation}>Fermer</button>

                </div>
            </div>

    )

}
