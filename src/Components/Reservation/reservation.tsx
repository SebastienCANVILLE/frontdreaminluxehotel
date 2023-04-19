import { useContext, useEffect, useState } from 'react';
import { Thotel, Troom } from '../../Context/hotel.context';
import { AuthContext } from '../../Context/auth.context';
import './reservation.css'


/**
 * @function Reservation
 * 
 * * Component parents qui récupère les components hotelCard et roomCard
 * * Système d'affichage par caroussel Bootstrp 5
 * * 
*/
type ProfilReservation = {
    reference: string,
    arrival_date: string,
    departure_date: string,
    roomId: number
}

export default function Reservation() {

    const { user } = useContext(AuthContext);

    const [hotels, setHotels] = useState<Thotel[] | null>(null);
    const [rooms, setRooms] = useState<Troom[] | null>(null);
    //console.log("LA ROOM", rooms);

    const [references, setReferences] = useState("");
    const [roomIdInput, setRoomIdInput] = useState(0);
    const [arrivalDateInput, setArrivalDateInput] = useState<string | undefined>("");
    const [departureDateInput, setDepartureDateInput] = useState<string | undefined>("");
    //console.log("LA ROOM", roomIdInput);
    useEffect(() => {
        async function getHotels() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await fetch('http://localhost:8000/hotels', requestOptions)
            const responseJson = await response.json();
            console.log(responseJson);
            setHotels(responseJson.data);
        };
        getHotels()
    }, []);


    /**  
     * @function handleSelectHotel
     * 
     * * fonction permettant de trouver l'id de l'hotel selectionné dans le select hotels.map et ensuite de renvoyer les chambres de cet hotel
    */
    function handleSelectHotel(hotelId: number) {

        if (hotels) {
            const selectedHotel = hotels.find((item) => item.id === hotelId);
            if (selectedHotel) {
                const selectedRooms = selectedHotel.rooms;
                setRooms(selectedRooms);
            }
        }
    }

    /**  
     * @function handleSelectRoom
     * 
     * * fonction permettant de trouver l'id de la room selectionnée dans le select rooms.map et ensuite de renvoyer la chambre dans le body
    */
    function handleSelectRoom(roomId: number) {

        if (rooms) {
            const selectedRoom = rooms.find((item) => item.id === roomId);
            if (selectedRoom) {
                const selectedRooms = selectedRoom.id;
                setRoomIdInput(selectedRooms);
            }
        }
    }

    /**  
        * @function reservationRegister
        * 
        * fonction permettant de trouver de créer une réservation
        * 
        * * Renvoyer un message d'erreur ou de succès
       */
    async function reservationRegister(event: { preventDefault: () => void; }) {

        event.preventDefault()


        let body: ProfilReservation;

        // condition qui vérifie que les input ne soit pas undefined en front et return le body si les conditions sont remplies
        if (arrivalDateInput !== undefined && departureDateInput !== undefined && roomIdInput !== undefined) {

            if (new Date(arrivalDateInput) < new Date(Date.now())) {
                alert("La date d'arrivée ne peut pas être antérieure à celle aujourd'hui");
                return
            }

            // body du register sur la partie html
            body = {
                reference: references,
                arrival_date: arrivalDateInput,
                departure_date: departureDateInput,
                roomId: roomIdInput
            }


            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.access_token}`
                },
                body: JSON.stringify(body)
            }

            const response = await fetch('http://localhost:8000/reservations', requestOptions)
            const responseJson = await response.json();
            console.log("RESERVATION", responseJson);


            if (responseJson.statusCode === 201) {
                resetInput()
                alert("Réservation créé avec succès");
            }

            else if (responseJson.message === "La date de départ doit être supérieure à la date d'arrivée") {
                alert("La date de départ doit être supérieure à la date d'arrivée");
            }

            else if (responseJson.message === "La chambre n'est pas disponible pour ces dates") {
                alert("La chambre n'est pas disponible pour ces dates");
            }

            else{
                return
            }

        }
    };

    // function qui reset les imputs du modal reservation
    async function resetInput() {

        setReferences("")
        setRoomIdInput(0)
        setArrivalDateInput(undefined)
        setDepartureDateInput(undefined)
        setHotels(null)
        setRooms(null)

    }

    return (

        <>

            {/* <!-- Buttom Trigger Modal --> */}
            <div className="container-fluid btn-Res d-flex justify-content-center">
                <button type="button" className="btn-reservation btn align-items-center" data-bs-toggle="modal" data-bs-target="#modalreservation">
                    Réservez-ici
                </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalreservation" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Réservez votre voyage</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /* onClick={resetInputLog} */></button>
                        </div>

                        {/* <!-- Formulaire de réservation --> */}
                        <form className="modal-body" onSubmit={reservationRegister}>

                            <div className="row">

                                {/* <!-- Select Hotel input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">

                                    <label htmlFor="regAdress">Choisissez votre hotel</label>

                                    <select className="form-select form-select-sm mb-2 pb-2 pt-2" aria-label=".form-select-lg example" required onChange={(event) => handleSelectHotel(+event.target.value)}>
                                        <option selected>Choisissez votre hotel</option>
                                        {hotels?.map((item, index) =>
                                            <option key={index} value={item.id}>{item.name_hotel}</option>
                                        )}

                                    </select>

                                </div>

                                {/* <!-- Select Room input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">

                                    <label htmlFor="regAdress">Choisissez votre chambre</label>

                                    <select className="form-select form-select-sm mb-2 pb-2 pt-2" aria-label=".form-select-lg example" required onChange={(event) => handleSelectRoom(+event.target.value)}>
                                        <option selected>Choisissez votre chambre</option>
                                        {rooms?.map((item, index) =>
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )}
                                    </select>

                                </div>

                            </div>

                            <div className="row">

                                {/* <!-- Arrived input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regArrival">Votre date d'arrivée</label>
                                    <input required type="date" className="form-control" onChange={(event) => setArrivalDateInput(event.target.value)}></input>
                                </div>

                                {/* <!-- Departure input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regDeparture">Votre date de départ</label>
                                    <input required type="date" className="form-control" onChange={(event) => setDepartureDateInput(event.target.value)}></input>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-connect" data-bs-dismiss="modal" aria-label="Close">Valider</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div >

        </>

    )

}