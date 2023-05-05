import { useContext, useEffect, useState } from 'react';
import { HotelContext, THotel, TRoom } from '../../Context/hotel.context';
import { AuthContext } from '../../Context/auth.context';
import './reservation.css'


/**
 * @function Reservation
 * 
 * * Component parents qui récupère les components hotelCard et roomCard
 * * Système d'affichage par caroussel Bootstrp 5
 * * 
*/
type TProfilReservation = {
    reference: string,
    arrival_date: string,
    departure_date: string,
    roomId: number,
    totalPrice: number
}

export default function Reservation() {

    const { user, setUser } = useContext(AuthContext);

    const [hotels, setHotels] = useState<THotel[] | null>(null);
    const [rooms, setRooms] = useState<TRoom[] | null>(null);

    const { setHotel } = useContext(HotelContext); //<---------------hôtel context

    const [references, setReferences] = useState("");
    const [hotelInput, setHotelInput] = useState(0); // ce useState sert uniquement à remettre la valeur de l'input hotel à l'initiale après réservation avec la fontion resetInput()
    const [roomIdInput, setRoomIdInput] = useState(0);
    const [arrivalDateInput, setArrivalDateInput] = useState<string>("");
    const [departureDateInput, setDepartureDateInput] = useState<string>("");
    const [roomPrice, setRoomPrice] = useState<number>(0); //<---------------room price

    const [check, setCheck] = useState<string>();
    const [checkPrice, setCheckPrice] = useState<number>();

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
            setHotel(responseJson.data); //<---------------hôtel context
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
                setHotelInput(hotelId);
            }
        }
    }

    /**  
     * @function handleSelectRoom
     * 
     * * fonction permettant de trouver l'id de la room selectionnée dans le select rooms.map et ensuite de renvoyer la chambre dans le body
     * * récupération du prix de la chambre afin de calculer le prix/nuit
    */
    function handleSelectRoom(roomId: number) {

        if (rooms) {
            const selectedRoom = rooms.find((item) => item.id === roomId);
            if (selectedRoom) {
                const selectedRooms = selectedRoom.id;
                setRoomIdInput(selectedRooms);
                const roomPrice = selectedRoom.price
                setRoomPrice(roomPrice); //<---------------room price
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

        let body: TProfilReservation;
        let totalPrice: number; //<---------------room price

        const numberOfNights = Math.ceil((new Date(departureDateInput).getTime() - new Date(arrivalDateInput).getTime()) / (1000 * 3600 * 24)); //<---------------room price
        totalPrice = numberOfNights * roomPrice; //<---------------room price

        // condition qui vérifie que les input ne soit pas undefined en front et return le body si les conditions sont remplies
        if (arrivalDateInput !== "" && departureDateInput !== "" && roomIdInput !== 0) {

            if (new Date(arrivalDateInput) < new Date(Date.now())) {
                alert("La date choisie ne peut pas être antérieure à celle aujourd'hui");
                return
            }

            // body du register sur la partie html
            body = {
                reference: references,
                arrival_date: arrivalDateInput,
                departure_date: departureDateInput,
                roomId: roomIdInput,
                totalPrice: totalPrice //<---------------room price
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
                user!.user.reservations = [...user!.user.reservations, responseJson.data]
                setUser({ ...user! });
                resetInput()
                alert("Réservation créé avec succès");
            } else if (responseJson.statusCode === 401) {
                alert("Veuillez vous connecter avant de valider votre réservation");
            } else if (responseJson.message === "La date de départ doit être supérieure à la date d'arrivée") {
                alert(responseJson.message);
            } else if (responseJson.message === "La chambre n'est pas disponible pour ces dates") {
                alert(responseJson.message);
            } else {
                return
            }

        } else {
            alert("Veuillez renseigner tous les champs");
            return
        }

    };

    // function qui reset les imputs du modal reservation
    async function resetInput() {

        setReferences("")
        setHotelInput(0)
        setRoomIdInput(0)
        setArrivalDateInput("")
        setDepartureDateInput("")
        setRoomPrice(0)

    }

    async function checkDisponibility(event: { preventDefault: () => void; }) {

        event.preventDefault()

        let body
        let totalPrice: number;

        const numberOfNights = Math.ceil((new Date(departureDateInput).getTime() - new Date(arrivalDateInput).getTime()) / (1000 * 3600 * 24)); //<---------------room price
        totalPrice = numberOfNights * roomPrice;

        // condition qui vérifie que les input ne soit pas undefined en front et return le body si les conditions sont remplies
        if (arrivalDateInput !== "" && departureDateInput !== "" && roomIdInput !== 0) {

            if (new Date(arrivalDateInput) < new Date(Date.now())) {
                alert("La date choisie ne peut pas être antérieure à celle aujourd'hui");
                return
            }

            // body du register sur la partie html
            body = {
                arrival_date: arrivalDateInput,
                departure_date: departureDateInput,
                roomId: roomIdInput,
                totalPrice: totalPrice //<---------------room price
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            const response = await fetch('http://localhost:8000/reservations/check', requestOptions)
            const responseJson = await response.json();
            console.log("CHECK", responseJson);

            if (responseJson.statusCode === 201) {
                setCheck("La chambre est disponible")
                setCheckPrice(totalPrice)
            } else if (responseJson.statusCode === 400) {
                setCheck("Indisponible aux dates demandées")
            } else {
                return
            }

        } else {
            alert("Veuillez renseigner tous les champs");
            return
        }

    };

    /**  
     * @function formatDate  
     * Permet récupérer les élements relevants de la date du jour - padStart permet de rajouter un 0 à gauche d'un nombre à un chiffre et ensuite
     * transforme la date en format string pour une comparaison si nécessaire. Ici la comparaison se fera avec le min des inputs date
     * pour pouvoir griser les dates antérieures au jour en cours. 
    */
    function formatDate(date: any) {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;

    };

    const colorText = check === "La chambre est disponible" ? 'text-success' : 'text-danger';

    return (

        <>

            {/* <!-- Buttom Trigger Modal --> */}
            {/*  <div className="container-fluid btn-Res d-flex justify-content-center">
                <button type="button" className="btn-reservation btn align-items-center" data-bs-toggle="modal" data-bs-target="#modalreservation">
                    Réservez-ici
                </button>
            </div> */}

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalreservation" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Réservez votre voyage</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* <!-- Formulaire de réservation --> */}
                        <form className="modal-body" onSubmit={reservationRegister}>

                            <div className="row">

                                {/* <!-- Select Hotel input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">

                                    <label htmlFor="regHotel">Choisissez votre hotel</label>

                                    <select className="form-select form-select-sm mb-2 pb-2 pt-2" id="regHotel" aria-label="choisissez votre hotel" required value={hotelInput} onChange={(event) => handleSelectHotel(+event.target.value)}>
                                        <option key="selectHotel" value={0}>Choisissez votre hotel</option>
                                        {hotels?.map((item, index) =>
                                            <option key={`selectHotel-${index}`} value={item.id}>{item.name_hotel}</option>
                                        )}

                                    </select>

                                </div>

                                {/* <!-- Select Room input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">

                                    <label htmlFor="regRoom">Choisissez votre chambre</label>

                                    <select className="form-select form-select-sm mb-2 pb-2 pt-2" id="regRoom" aria-label="choisissez votre chambre" /* required */ value={roomIdInput} onChange={(event) => handleSelectRoom(+event.target.value)}>
                                        <option selected key="selectRoom" value={0}>Choisissez votre chambre</option>
                                        {rooms?.map((item, index) =>
                                            <option key={`selectRoom-${index}`} value={item.id}>{item.name}</option>
                                        )}
                                    </select>

                                </div>

                            </div>

                            <div className="row">

                                {/* <!-- Arrived input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regArrival">Votre date d'arrivée</label>
                                    <input id="regArrival" type="date" className="form-control" aria-label="choisissez votre date d'arrivée" min={formatDate(new Date(Date.now()))}
                                        value={arrivalDateInput} onChange={(event) => setArrivalDateInput(event.target.value)} ></input> {/*onChange={(event) => {setArrivalDateInput(event.target.value); checkDisponibility(event)}} */}
                                </div>

                                {/* <!-- Departure input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regDeparture">Votre date de départ</label>
                                    <input id="regDeparture" type="date" className="form-control" aria-label="choisissez votre date de départ" min={formatDate(new Date(arrivalDateInput))}
                                        value={departureDateInput} onChange={(event) => setDepartureDateInput(event.target.value)} ></input>{/* onChange={(event) => {setDepartureDateInput(event.target.value); checkDisponibility(event)}} */}
                                </div>

                                {/* <!-- P/disponibility --> */}
                                <div className=" col-md-6 col-12 mb-3 mt-1 text-center">
                                    <label className="labelRegister mt-1" htmlFor="regDisponibility">Disponibilité </label>
                                    <p className={colorText} id="regDisponibility" aria-label="disponibilité de la chambre">{check}</p>
                                </div>

                                {/* <!-- P/totalePrice  --> */}
                                <div className=" col-md-6 col-12 mb-3 mt-1 text-center">
                                    <label className="labelRegister" htmlFor="regPrice">Prix du séjour</label>
                                    <p id="regPrice" aria-label="prix du séjour">{checkPrice} {/* € */}
                                    <span className="material-symbols-outlined px-0">euro</span>
                                    </p>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button onClick={checkDisponibility} className="btn btn-primary" >Vérifier</button>
                                <button type="submit" className="btn btn-connect" >Réserver</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div >

        </>

    )

}

