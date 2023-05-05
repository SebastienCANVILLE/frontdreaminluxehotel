import { useContext } from "react";
import { TComments } from "../../Context/hotel.context";
import { AuthContext } from "../../Context/auth.context";

export function CommentView(props: { del(id: number): unknown; comments: TComments }) {

    const { user } = useContext(AuthContext)

    async function deleteComment() {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.access_token}`
            }
        };
        const response = await fetch(`http://localhost:8000/comments/${props.comments.id}`, requestOptions)
        const responseJson = await response.json()

        console.log("Success!", responseJson);

        if (responseJson.statusCode === 200) {
            props.del(props.comments.id)
            alert("Commentaire supprimé")
        }
    }

    return (
        <>

            <div className="row-fluid">

                <div className="d-flex justify-content-center text-center mt-2">
                    <h5>{props.comments.clientName}</h5>
                </div>

                <div className="d-flex justify-content-center text-center mt-1">
                    <p>{props.comments.commentary}</p>
                </div>

                {user?.access_token && user?.user.role === "admin" &&
                <button onClick={deleteComment} type="button" className="btn btn-outline align-items-center" data-mdb-ripple-color="dark" title="Supprimer le commentaire" >
                    <span id="deleteRes" className="material-symbols-outlined">delete</span>
                </button>}

            </div>

        </>
    )
}