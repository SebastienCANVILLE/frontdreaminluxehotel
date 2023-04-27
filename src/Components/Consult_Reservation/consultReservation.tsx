import { useContext } from 'react';
import { AuthContext } from '../../Context/auth.context';
import './consultReservation.css'


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
        }
    }

    return (

        <>

            <tr>

                <td scope="col">n° {reservation.reference}</td>
                <td scope="col">{reservation.arrival_date}</td>
                <td scope="col">{reservation.departure_date}</td>
                <td scope="col">{reservation.totalPrice} €</td>

                <button onClick={deleteReservation} type="button" className="btn btn-outline-danger me-2 mb-2 mt-2 px-3 align-items-center" data-mdb-ripple-color="dark" >
                    <i className="bi bi-trash3"></i>
                </button>

            </tr>

        </>

    )

}