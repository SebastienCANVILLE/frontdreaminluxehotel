import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/auth.context';
import './login.css'

type ProfilLog = {
    email: string;
    password: string;
}

export default function Login() {

    const [emailInput, setEmailLogInput] = useState("")
    const [passwordInput, setPasswordLogInput] = useState("")

    const auth = useContext(AuthContext)

    async function fetchDataLog() {

        const body: ProfilLog = {
            email: emailInput,
            password: passwordInput,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch('http://localhost:8000/auth/login', requestOptions);
        const responseJson = await response.json();

        console.log("RESPONSE", response, "RESPONSEJSON", responseJson);


        //si la reponse renvoi l' access_token de l'user connecté, alors on envoi la donnée dans le context pour la réutiliser ailleur.
        if (responseJson.access_token) {
            auth.setUser({ ...responseJson });
            resetInputLog()
            alert("Connexion réussi");
        } else if (responseJson.statusCode === 401) {
            alert("Compte inexistant ou données mal renseignées");
        } else {
            return
        }

    }

    //fonction qui reset les inputs
    async function resetInputLog() {
        setEmailLogInput("")
        setPasswordLogInput("")
    }

    return (
        <>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="login" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">{/* modal-dialog-centered */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="container d-flex justify-content-center modal-title fs-5" id="exampleModalLabel">Connexion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetInputLog}></button>
                        </div>

                        <div className="modal-body">

                            {/* <!-- Email input --> */}
                            <label htmlFor="signInEmail">Email</label>
                            <div className="form-outline mb-3 mt-1">
                                <input type="email" id="signInEmail" className="form-control" aria-label="Saisissez votre email" value={emailInput} onChange={(event) => setEmailLogInput(event.target.value)}></input>
                            </div>

                            {/* <!-- Password input --> */}
                            <label htmlFor="signInPassword">Mot de passe</label>
                            <div className="form-outline mb-3 mt-1">
                                <input type="password" id="signInPassword" className="form-control" aria-label="Saisissez votre mot de passe" value={passwordInput} onChange={(event) => setPasswordLogInput(event.target.value)}></input>
                            </div>

                            {/* <!-- Password Link --> */}
                            <div className="col-center text-center align-items-center">
                                <a href="#!" className="link-password">Mot de passe oublié ?</a>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-connect" data-bs-dismiss="modal" aria-label="Close" onClick={fetchDataLog}>Se connecter</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}