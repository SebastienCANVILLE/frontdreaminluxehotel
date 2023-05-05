import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/auth.context'
import './profil.css'

type TCompte = {

    email?: string,
    civility?: string,
    firstname?: string,
    lastname?: string,
    adress_line?: string,
    zipCode?: string,
    city?: string,
    country?: string,
    phone_number?: string

}

export default function ProfilComponent() {

    const { user, setUser } = useContext(AuthContext);

    const [civility, setCivilityInput] = useState(user?.user.civility)
    const [lastnameInput, setLastnameInput] = useState(user?.user.lastname)
    const [firstnameInput, setFirstnameInput] = useState(user?.user.firstname)
    const [adressInput, setAdressInput] = useState(user?.user.adress_line)
    const [zipCodeInput, setZipCodeInput] = useState(user?.user.zipCode)
    const [cityInput, setCityInput] = useState(user?.user.city)
    const [countryInput, setCountryInput] = useState(user?.user.country)
    const [phoneInput, setPhoneInput] = useState(user?.user.phone_number)
    const [emailInput, setEmailInput] = useState(user?.user.email)

    const [showInput, setShowInput] = useState(false);

    async function patchProfil() {

        const body: TCompte = {
            civility: civility,
            lastname: lastnameInput,
            firstname: firstnameInput,
            adress_line: adressInput,
            zipCode: zipCodeInput,
            city: cityInput,
            country: countryInput,
            phone_number: phoneInput,
            email: emailInput,
        }

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.access_token}`
            },
            body: JSON.stringify(body)
        };

        const response = await fetch(`http://localhost:8000/users/`, requestOptions)
        const responseJson = await response.json()
        console.log(responseJson)

        if (responseJson.statusCode === 200) {
            const updatedUser = { ...user!.user, ...responseJson.data }
            setUser({ ...user!, user: updatedUser })
            setShowInput(false)
            alert("Modification prise en compte");
        } else {
            return
        }


    };

    function update() {
        setShowInput(true)
    }

    function closeUpdate() {
        setShowInput(false)
    }

    async function deleteProfil() {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        const response = await fetch(`http://localhost:8000/users/`, requestOptions)
        const responseJson = await response.json()

        console.log("Success!", responseJson);

        if (responseJson.statusCode === 200) {
            setUser(null) // pour que l'utilisateur se logout automatiquement après suppression
            alert("Votre compte a bien été supprimé")
        };

    }

    return (


        <div className="text-center mt-3" id="profil-name">

            <h3>{user?.user.civility} {user?.user.lastname} {user?.user.firstname}</h3>

            <div className='row d-flex justify-content-center ms-1 me-1'>

                {/* Input Selector civility*/}
                {showInput &&
                    <div className="col-12 col-md-4">

                        <select className="form-select form-select mt-1 mb-2 pb-2 pt-1" aria-label="choisissez votre civilité"
                            value={civility} onChange={(event) => setCivilityInput(event.target.value)}>
                            <option selected>Choisissez votre civilité</option>
                            <option value="Monsieur">Monsieur</option>
                            <option value="Madame">Madame</option>
                            <option value="Mademoiselle">Mademoiselle</option>
                        </select>

                    </div>}

                {/* Input Selector lastname */}
                {showInput &&
                    <div className="col-12 col-md-4 mt-1 mb-1">
                        <input type='text' className="form-control" placeholder="Nom"
                            value={lastnameInput} onChange={(event) => setLastnameInput(event.target.value)} aria-label="Recipient's username"></input>
                    </div>}

                {/* Input Selector firstname */}
                {showInput &&
                    <div className="col-12 col-md-4 mt-1 mb-1">
                        <input type='text' className="form-control" placeholder="Prénom"
                            value={firstnameInput} onChange={(event) => setFirstnameInput(event.target.value)} aria-label="Recipient's username"></input>
                    </div>}

            </div >

            <div className="text-center mt-3" id="profil-name">

                <div className="col">
                    <h5>{user?.user.adress_line}</h5>
                    <h5>{user?.user.zipCode} {user?.user.city}</h5>
                    <h5>{user?.user.country}</h5>
                </div>

                <div className='row d-flex justify-content-center ms-1 me-1'>

                    {/* Input Selector lastname */}
                    {showInput &&
                        <div className="col-12 col-md-3 mt-1 mb-1">
                            <input type='text' className="form-control" placeholder="Adresse"
                                value={adressInput} onChange={(event) => setAdressInput(event.target.value)} aria-label="Adresse"></input>
                        </div>}


                    {/* Input Selector lastname */}
                    {showInput &&
                        <div className="col-12 col-md-3 mt-1 mb-1">
                            <input type='text' className="form-control" placeholder="Code postal"
                                value={zipCodeInput} onChange={(event) => setZipCodeInput(event.target.value)} aria-label="Code postal"></input>
                        </div>}

                    {/* Input Selector lastname */}
                    {showInput &&
                        <div className="col-12 col-md-3 mt-1 mb-1">
                            <input type='text' className="form-control" placeholder="Ville"
                                value={cityInput} onChange={(event) => setCityInput(event.target.value)} aria-label="Ville"></input>
                        </div>}

                    {/* Input Selector firstname */}
                    {showInput &&
                        <div className="col-12 col-md-3 mt-1 mb-1">
                            <input type='text' className="form-control" placeholder="Pays"
                                value={countryInput} onChange={(event) => setCountryInput(event.target.value)} aria-label="Recipient's username"></input>
                        </div>}

                </div>
            </div>


            <div className="text-center mt-3" id="profil-name">
                <div className="col">
                    <h5>{user?.user.email}</h5>
                    <h5>{user?.user.phone_number}</h5>
                </div>
            </div>

            <div className='row d-flex justify-content-center ms-1 me-1'>

                {/* Input Selector phone */}
                {showInput &&
                    <div className="col-12 col-md-3 mt-1 mb-1">
                        <input type='text' className="form-control" placeholder="Téléphone"
                            value={phoneInput} onChange={(event) => setPhoneInput(event.target.value)} aria-label="Téléphone"></input>
                    </div>}

                {/* Input Selector lastname */}
                {showInput &&
                    <div className="col-12 col-md-3 mt-1 mb-1">
                        <input type='text' className="form-control" placeholder="Email"
                            value={emailInput} onChange={(event) => setEmailInput(event.target.value)} aria-label="Email"></input>
                    </div>}

            </div>

            {showInput &&
                <div className="mt-4 align-items-center">

                    <button type="button" className="btn btn-outline me-1" title="Valider les modifications" onClick={patchProfil}>
                        <span id= "validate" className="material-symbols-outlined">check_circle</span>
                    </button>

                    <button type="button" className="btn btn-outline ms-1"  title="Annuler les modifications" onClick={closeUpdate}>
                    <span id= "cancel" className="material-symbols-outlined">cancel</span>
                    </button>
                </div>}

            <div className="mt-5 align-items-center">
                <button type="button" className="btn btn-outline-warning" onClick={update}>Modifier le compte</button>
            </div>

            <div className="mt-3 align-items-center">
                <button type="button" className="btn btn-outline-danger" onClick={deleteProfil}>Supprimer le compte</button>
            </div>

        </div>

    )

}
