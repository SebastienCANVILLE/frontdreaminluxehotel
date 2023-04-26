import { createContext } from "react";

/**
 * création d'un context (super PROPS) autour de l'hotel permettant d'aller chercher la donnée de celui-ci,
 * de récupérer ce qui nous intéresse pour l'utiliser n'importe ou dans le code.
 * 
 * Pour l'utiliser dans un component il faut importer le context et transporter la donnée grâce à un UseState
 * 
 * Pour la création de ce context, nous typons notre user, créons une interface afin de déterminer ce que nous voulons recevoir, 
 * ici soit l'user, soit une valeur null et nous créons une constante Auth qui renvoi par défaut une valeur null.
 */
export type THotel = {

    id: number,
    photo: string,
    name_hotel: string,
    adress_line: string,
    zipCode: string,
    phone_number: string,
    city: string,
    comments: { id: number, commentary: string }[],
    rooms: TRoom [],
    reservations: { id: number, reference: string, arrival_date: string, departure_date: string, totalPrice: number}[]
}

export type TRoom = {

    id: number,
    photo: string,
    name: string,
    number_room: string,
    price: number

}

export interface IHotelContext {
    hotel: THotel | null;
    setHotel: (hotel: THotel | null) => void;
}

export const HotelContext = createContext<IHotelContext>({
    hotel: null,
    setHotel: () => { },

})