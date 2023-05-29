import { useContext, useEffect } from 'react';
import { HotelContext } from '../../Context/hotel.context';
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
 
    const {hotel, setHotel} = useContext(HotelContext)
    useEffect(() => {
        async function getHotels() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await fetch('http://localhost:8000/hotels', requestOptions)
            const responseJson = await response.json();
            console.log(responseJson);
            setHotel(responseJson.data);
        };
        getHotels()
    }, [hotel]);


    return (

            <div className="container-fluid pb-5 pe-0 ps-0">

                <h1 className="destination-title text-center mt-3 mb-3 px-0" id="staticBackdropLabel">Nos destinations de rêves</h1>

                {/* <!-- Carousel : BTN ----> hotelCard.tsx*/}
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        

                        {/* // item = un element du tableau soit un hotel en entier (id, name ect...) et index = 0/1/2 du tableau */}
                        {/* <!-- Hotel CArd --> */}
                        {hotel?.map((item, index) =>
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={item.id}>
                                <HotelCard hotels={item}></HotelCard>
                            </div>
                        )}

                    </div>

                </div>

            </div>

    )

}

