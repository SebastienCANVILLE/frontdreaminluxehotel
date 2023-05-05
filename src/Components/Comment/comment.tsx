import { useContext, useState } from 'react';
import './comment.css'
import { AuthContext } from '../../Context/auth.context';
import { HotelContext, THotel } from '../../Context/hotel.context';

// permet le typage de la partie body
type TCommentRegister = {
    clientName: string,
    commentary: string,
    hotelId: number
}

export default function Comment() {

    const { user, setUser } = useContext(AuthContext)
    const { hotel, setHotel } = useContext(HotelContext) //<---------------hôtel context

    const [clientNameInput, setClientNameInput] = useState("")
    const [commentaryInput, setCommentaryInput] = useState("")
    const [hotelInput, setHotelInput] = useState(0);


    /**  
     * @function handleSelectHotel
     * 
     * * fonction permettant de trouver l'id de l'hôtel selectionné dans le select input et ensuite de renvoyer celui-ci dans le body
    */
    function handleSelectHotel(hotelId: number) {

        if (hotel) {
            const selectedHotel = hotel.find((item: THotel) => item.id === hotelId);
            if (selectedHotel) {
                const selectedHotels = selectedHotel.id;
                setHotelInput(selectedHotels);
            }
        }
    }

    async function fetchCommentaryRegister(event: { preventDefault: () => void; }) {

        event.preventDefault()

        let body: TCommentRegister;

        // condition qui vérifie que l'input ne soit pas undefined en front et return le body si les conditions sont remplies
        if (clientNameInput !== "" && commentaryInput !== "" && hotelInput !== 0) {

            // body du register sur la partie html
            body = {
                clientName: clientNameInput,
                commentary: commentaryInput,
                hotelId: hotelInput
            }

            // Options de requêtes et envoi des données de l'input en BDD
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.access_token} `
                },
                body: JSON.stringify(body)
            };

            const response = await fetch('http://localhost:8000/comments', requestOptions);
            const responseJson = await response.json();

            console.log(response, responseJson);

            if (responseJson.statusCode === 201) {
                resetInput()
                alert("Commentaire créé avec succès");
            } /* else if (responseJson.statusCode === 400) { <-------------------------------------------------------------A VOIR
            } */ else {
                return
            }

        } else {
            alert("Veuillez renseigner tous les champs");
            return
        }

    }

    async function resetInput() {
        setClientNameInput("")
        setCommentaryInput("")
        setHotelInput(0)
    }


    return (
        <>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalcomment" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Commentez votre séjour</h1>
                            <button type="button" id="close-btn" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetInput}></button>
                        </div>

                        {/* <!-- Formulaire pour commenter --> */}
                        <form className="modal-body" onSubmit={fetchCommentaryRegister}>

                            <div className="row">

                                {/* <!-- Select Hotel input --> */}
                                <label htmlFor="selectHotel">Sélectionnez votre hotel :</label>
                                <select className="form-select mt-1 mb-2" id="selectHotel" aria-label="Sélectionner votre hôtel"
                                    required value={hotelInput} onChange={(event) => handleSelectHotel(+event.target.value)}>
                                    <option key="selectHotel" value={0}>--- Faites votre choix ---</option>

                                    {hotel?.map((item: THotel, index: number) => ( // map par hotelcontext
                                        <option key={`selectHotel-${index}`} value={item.id}>
                                            {item.name_hotel}
                                        </option>
                                    ))}

                                </select>

                                {/* <!-- clientName input --> */}
                                <div className="mt-2 mb-3">
                                    <label htmlFor="clientName">Saisissez votre commentaire</label>
                                    <input type= "text" className="form-control" id="clientName" aria-label="Saisissez votre nom"
                                        required value={clientNameInput} onChange={(event) => setClientNameInput(event.target.value)} ></input>

                                </div>

                                {/* <!-- Textarea input --> */}
                                <div className="mt-2 mb-3">
                                    <label htmlFor="commentArea" className="form-label">Saisissez votre commentaire</label>
                                    <textarea className="form-control" id="commentArea" aria-label="Saisissez votre commentaire"
                                        required value={commentaryInput} onChange={(event) => setCommentaryInput(event.target.value)} ></textarea>

                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-register" data-bs-dismiss="modal">Valider</button>
                            </div>

                        </form>

                    </div>
                </div >
            </div >

        </>
    )
}
