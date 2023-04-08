import { createContext } from "react";

/**
 * création d'un context (super PROPS) autour de l'user permettant d'aller chercher la donnée de l'utilisateur,
 * de récupérer ce qui nous intéresse pour l'utiliser n'importe ou dans le code.
 * 
 * Pour l'utiliser dans un component il faut importer le context et transporter la donnée grâce à un UseState
 * 
 * Pour la création de ce context, nous typons notre user, créons une interface afin de déterminer ce que nous voulons recevoir, 
 * ici soit l'user, soit une valeur null et nous créons une constante Auth qui renvoi par défaut une valeur null.
 */
export type Tuser = {
    user: {
        id: number,
        email: string,
        civility: string,
        firstname: string,
        lastname: string,
        adress_line: string,
        zipCode: string,
        city: string,
        country: string,
        phone_number: string,
        role: any,
        comments: { id: number, commentary: string }[],
        reservations: { id: number, arrival_date: Date, departure_date: Date, }[]
    },
    access_token: string
}

export interface IAuthContext {
    user: Tuser | null;
    setUser: (user: Tuser | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => { },

})
