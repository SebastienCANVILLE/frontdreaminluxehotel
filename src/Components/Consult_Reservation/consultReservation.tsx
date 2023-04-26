import './consultReservation.css'


type TReservation = {
    reservation: { id: number, reference: string, arrival_date: string, departure_date: string, totalPrice: number }
}

export default function ConsultReservation(props: TReservation) {

    const { reservation } = props;

    return (

        <>

            <tr>
                <td scope="col">n° {reservation.reference}</td>
                <td scope="col">{reservation.arrival_date}</td>
                <td scope="col">{reservation.departure_date}</td>
                <td scope="col">{reservation.totalPrice} €</td>
            </tr>

        </>

    )

}