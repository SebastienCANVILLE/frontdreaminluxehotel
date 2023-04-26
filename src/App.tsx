import React, { useState } from 'react';
import HomePage from './Pages/homePage';
import { AuthContext, Tuser } from './Context/auth.context';
import { HotelContext, THotel } from './Context/hotel.context';
import './App.css';

export default function App() {

  const [user, setUser] = useState<Tuser | null>(null);
  const [hotel, setHotel] = useState<THotel | null>(null);

  return (

    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <HotelContext.Provider value={{ hotel: hotel, setHotel: setHotel }}>

        <HomePage></HomePage>

      </HotelContext.Provider>
    </AuthContext.Provider>

  );
};

