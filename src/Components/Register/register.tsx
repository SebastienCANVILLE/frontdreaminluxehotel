import { useState } from 'react';
import './register.css'

// permet le typage de la partie body
type TProfilRegister = {
    email: string,
    password: string,
    password_confirm: string,
    civility: string,
    lastname: string;
    firstname: string,
    adress_line: string,
    zipCode: string,
    city: string,
    country: string,
    phone_number: string,
}

export default function Register() {

    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("")
    const [civility, setCivilityInput] = useState("")
    const [lastnameInput, setLastnameInput] = useState("")
    const [firstnameInput, setFirstnameInput] = useState("")
    const [adressInput, setAdressInput] = useState("")
    const [zipCodeInput, setZipCodeInput] = useState("")
    const [cityInput, setCityInput] = useState("")
    const [countryInput, setCountryInput] = useState("")
    const [phoneInput, setPhoneInput] = useState("")


    async function fetchDataRegister(event: { preventDefault: () => void; }) {

        event.preventDefault()

        let body: TProfilRegister;

        // condition qui vérifie que les input ne soit pas undefined en front et return le body si les conditions sont remplies
        if (emailInput !== "" && passwordInput !== "" && passwordConfirmInput !== "" && civility !== ""
            && lastnameInput !== "" && firstnameInput !== "" && adressInput !== "" && zipCodeInput !== ""
            && cityInput !== "" && phoneInput !== "") {

            // body du register sur la partie html
            body = {
                email: emailInput,
                password: passwordInput,
                password_confirm: passwordConfirmInput,
                civility: civility,
                lastname: lastnameInput,
                firstname: firstnameInput,
                adress_line: adressInput,
                zipCode: zipCodeInput,
                city: cityInput,
                country: countryInput,
                phone_number: phoneInput,
            }

            // Options de requêtes et envoi des données des input en BDD
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            const response = await fetch('http://localhost:8000/users/register', requestOptions);
            const responseJson = await response.json();

            console.log(response, responseJson);

            //si nous avons la réponse json du register dans la console, alors nous faisons un reset des input du formulaire
            if (responseJson.statusCode === 201) {
                resetInput()
                alert("Compte créé avec succès");
            } else if (responseJson.statusCode === 400) {
                alert("Votre mot de passe ne correspond pas au critère de sécurité");
            } else if (responseJson.statusCode === 409) {
                alert("Les mots de passe doivent être identiques");
            } else if (responseJson.message === "L'Email est déjà utilisé") {
                alert(responseJson.message);
            } else {
                return
            }

        } else {
            alert("Veuillez renseigner tous les champs");
            return
        }

    }

    async function resetInput() { //resetInput

        setEmailInput("")
        setPasswordInput("")
        setPasswordConfirmInput("")
        setCivilityInput("")
        setLastnameInput("")
        setFirstnameInput("")
        setAdressInput("")
        setZipCodeInput("")
        setCityInput("")
        setCountryInput("")
        setPhoneInput("")

        document.getElementById('close-btn')?.click()

    }

    return (
        <>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="register" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Créer son compte</h1>
                            <button type="button" id="close-btn" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetInput}></button>
                        </div>

                        <form className="modal-body" onSubmit={fetchDataRegister}>

                            <div className="row">

                                {/* <!-- Citizen input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regCitizen">Civilité</label>
                                    <select className="form-select form-select-sm mb-2 pb-2 pt-2" id="regCitizen" aria-label="choisissez votre civilité"
                                        value={civility} onChange={(event) => setCivilityInput(event.target.value)} required>
                                        <option selected>Choisissez votre civilité</option>
                                        <option value="Monsieur">Monsieur</option>
                                        <option value="Madame">Madame</option>
                                        <option value="Mademoiselle">Mademoiselle</option>
                                    </select>
                                </div>

                                {/* <!-- Lastname input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regLastname">Nom</label>
                                    <input type="text" className="form-control" id="regLastname" aria-label="choisissez votre nom"
                                        value={lastnameInput} onChange={(event) => setLastnameInput(event.target.value)} required></input>
                                </div>

                                {/* <!-- Firstname input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regFirstname">Prénom</label>
                                    <input type="text" className="form-control" id="regFirstname" aria-label="choisissez votre prénom"
                                        value={firstnameInput} onChange={(event) => setFirstnameInput(event.target.value)} required></input>
                                </div>

                            </div>

                            <div className="row">

                                {/* <!-- Adress input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regAdress">Adresse</label>
                                    <input type="text" className="form-control" id="regAdress" aria-label="choisissez votre adresse"
                                        value={adressInput} onChange={(event) => setAdressInput(event.target.value)} required></input>
                                </div>

                                {/* <!-- Zipcode input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regZipcode">Code postal</label>
                                    <input type="text" className="form-control" id="regZipcode" aria-label="choisissez votre code postal"
                                        value={zipCodeInput} onChange={(event) => setZipCodeInput(event.target.value)} required></input>
                                </div>

                                {/* <!-- City input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regCity">Ville</label>
                                    <input type="text" className="form-control" id="regCity" aria-label="choisissez votre ville"
                                        value={cityInput} onChange={(event) => setCityInput(event.target.value)} required></input>
                                </div>

                            </div>

                            <div className="row">

                                {/* <!-- Country input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regCountry">Pays</label>
                                    <input type="text" className="form-control" id="regCountry" aria-label="choisissez votre pays"
                                        value={countryInput} onChange={(event) => setCountryInput(event.target.value)} required></input>
                                </div>

                                {/* <!-- Phone input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regPhone">Téléphone</label>
                                    <input type="text" className="form-control" id="regPhone" aria-label="choisissez téléphone"
                                        value={phoneInput} onChange={(event) => setPhoneInput(event.target.value)} required></input>
                                </div>

                            </div>

                            <div className="row">

                                {/* <!-- Lastname input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regEmailRegister">Email</label>
                                    <input type="email" className="form-control" id="regEmailRegister" placeholder="user@gmail.fr" aria-label="choisissez email"
                                        value={emailInput} onChange={(event) => setEmailInput(event.target.value)} required></input>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regPassword">Mot de passe</label>
                                    <input type="password" className="form-control" id="regPassword" placeholder="Min 8 caract, 1Maj, 1chiffre, 1symbole" aria-label="choisissez mot de passe"
                                        value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} required></input>
                                </div>

                                {/* <!-- Password confirm input --> */}
                                <div className="form-outline col-md-4 col-12 mb-3 mt-1">
                                    <label htmlFor="regPasswordConfirm">Confirmation mot de passe</label>
                                    <input type="password" className="form-control" id="regPasswordConfirm" aria-label="confirmer votre mot de passe"
                                        value={passwordConfirmInput} onChange={(event) => setPasswordConfirmInput(event.target.value)} required></input>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-register">Valider</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}