
import './profil.css'
import ProfilComponent from './profilcomponent'

type TProps = {
    setProfil: Function
}
export default function Profil(props: TProps) { // props pour l'utilisation de la fermeture du profil via le bouton

    const closeMyProfil = () => { props.setProfil(false) } // ferme le composant

    return (

        <div className="contRes text-center pt-3 pb-5 mb-3" id="profil" >

            <h4 className="resProfilTitle">Mon profil</h4>

            <div className="mt-3">
                <i className="bi bi-person-circle fs-1"></i>
            </div>

            <div className="body mt-4">
                <ProfilComponent></ProfilComponent>
            </div>

            <button type="button" className="btn btn-dark mb-2 mt-5 me-2 align-items-center float-end"
                onClick={closeMyProfil}>Fermer</button>

        </div>


    )

}
