import { useContext } from 'react';
import { AuthContext } from '../../Context/auth.context';
import './consultReservation.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TReservation = {
    reservation: { id: number, reference: string, arrival_date: string, departure_date: string, totalPrice: number },
    del: Function
}

export default function ConsultReservation(props: TReservation) {

    const { reservation } = props;
    const { user } = useContext(AuthContext)

    async function deleteReservation() {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        const response = await fetch(`http://localhost:8000/reservations/${props.reservation.id}`, requestOptions)
        const responseJson = await response.json()

        console.log("Success!", responseJson);

        if (responseJson.statusCode === 200) {
            props.del(props.reservation.id)
            toast.success('Annulation de votre réservation prise en compte :-(', { position: "top-center", autoClose: 2000 });
        }
    }

    return (

        <>

            <tr>

                <td scope="col">n° {reservation.reference}</td>
                <td scope="col">{reservation.arrival_date}</td>
                <td scope="col">{reservation.departure_date}</td>
                <td scope="col">{reservation.totalPrice} {/* € */}
                <span className="material-symbols-outlined px-0">euro</span></td>

                <button onClick={deleteReservation} type="button" className="btn btn-outline me-2 mb-2 mt-2 px-3 align-items-center" data-mdb-ripple-color="dark" title="Supprimer la réservation" >
                    <span id="deleteRes" className="material-symbols-outlined">delete</span>
                </button>

                <button type="button" id="addComment" className="btn btn-outline me-2 mb-2 mt-2 px-3 align-items-center" data-bs-toggle="modal" data-bs-target="#modalcomment" title="Commenter votre séjour">
                    <span className="material-symbols-outlined">heart_check</span>
                </button>

            </tr>

        </>

    )

}