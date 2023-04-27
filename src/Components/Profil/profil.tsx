import { useContext } from 'react'
import { AuthContext } from '../../Context/auth.context'
import './profil.css'

type TProps = {
    setProfil: Function
}
export default function ConsultReservations(props: TProps) {

    const { user, setUser } = useContext(AuthContext);

    const closeMyProfil = () => { props.setProfil(false) } // ferme le composant

    /* function deleteReservation(id: number) {
        const reservation = user!.user.reservations.filter(item => item.id !== id);
        user!.user.reservations = reservation;

        setUser({ ...user!});
    } */

    return (

        <div className="contRes text-center pt-3 pb-5 mb-3" id="profil" >

            <h4 className="resProfilTitle">Mon profil</h4>

            <div className="mt-4">
                <i className="bi bi-person-circle fs-1"></i>
            </div>

            {/* {user?.user.reservations.map(((item) =>
                            <tbody className="table-group-divider" key={item.id}>

                                <ConsultReservation del={deleteReservation} reservation={item}></ConsultReservation>

                            </tbody>))} */}



            <button type="button" className="btn btn-dark mb-2 mt-3 me-2 align-items-center float-end"
                onClick={closeMyProfil}>Fermer</button>

        </div>


    )

}
