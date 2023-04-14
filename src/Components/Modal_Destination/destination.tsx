import { useEffect, useState } from 'react';
import { Thotel } from '../../Context/hotel.context';
import HotelCard from '../Hotel_Card/hotelCard';
import './destination.css'


/**
 * @function Destination
 * 
 * * Component parents qui récupère les components hotelCard et roomCard
 * * Système d'affichage par caroussel Bootstrp 5
 * * 
 */
export default function Destination() {

    const [hotels, setHotels] = useState<Thotel[] | null>(null);

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


    return (

        <>

            {/* <!-- Buttom Trigger Modal --> */}
            <div className="container-fluid btn-destPos d-flex justify-content-center">
                <button type="button" className="btn-destination btn align-items-center" data-bs-toggle="modal" data-bs-target="#modaldestination">
                    Nos destinations
                </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modaldestination" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title container d-flex justify-content-center fs-5" id="staticBackdropLabel">Nos destinations</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body-fluid">

                            {/* <!-- Carousel --> */}
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">

                                    {/* // item = un element du tableau soit un hotel en entier (id, name ect...) et index = 0/1/2 du tableau */}
                                    {/* <!-- Hotel CArd --> */}
                                    {hotels?.map((item, index) =>
                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={item.id}>
                                            <HotelCard hotel={item}></HotelCard>
                                        </div>
                                    )}

                                </div>

                                {/* <!-- Buttom previous --> */}
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                {/* <!-- Buttom next --> */}
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Fermer</button>

                        </div>
                    </div>
                </div>
            </div >

        </>
        
    )

}

