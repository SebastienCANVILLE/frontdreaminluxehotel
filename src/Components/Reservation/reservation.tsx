import './reservation.css'


/**
 * @function Reservation
 * 
 * * Component parents qui récupère les components hotelCard et roomCard
 * * Système d'affichage par caroussel Bootstrp 5
 * * 
 */
export default function Reservation() {




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

                        <div className="modal-body">


                            <div className="row">

                                {/* <!-- Select Hotel input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regAdress">Choisissez votre hotel</label>
                                    <input required type="text" className="form-control" /* value={adressInput} onChange={(event) => setAdressInput(event.target.value)} */></input>
                                </div>

                                {/* <!-- Select Room input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regZipcode">Choisissez votre chambre</label>
                                    <input required type="text" className="form-control" /* value={zipCodeInput} onChange={(event) => setZipCodeInput(event.target.value)} */></input>
                                </div>

                            </div>

                            <div className="row">

                                {/* <!-- Arrived input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regCountry">Votre date d'arrivée</label>
                                    <input required type="text" className="form-control" /* value={countryInput} onChange={(event) => setCountryInput(event.target.value)} */></input>
                                </div>

                                {/* <!-- Depature input --> */}
                                <div className="form-outline col-md-6 col-12 mb-3 mt-1">
                                    <label htmlFor="regPhone">Votre date de départ</label>
                                    <input required type="text" className="form-control" /* value={phoneInput} onChange={(event) => setPhoneInput(event.target.value)} */></input>
                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-connect" data-bs-dismiss="modal" aria-label="Close">Valider</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

}