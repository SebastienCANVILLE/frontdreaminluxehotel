import React, { useState } from 'react';
import './App.css';
import HomePage from './Pages/homePage';
import { AuthContext, Tuser } from './Context/auth.context';
import { HotelContext, Thotel } from './Context/hotel.context';

export default function App() {

  const [user, setUser] = useState<Tuser | null>(null);
  const [hotel, setHotel] = useState<Thotel | null>(null);

  return (

    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <HotelContext.Provider value={{ hotel: hotel, setHotel: setHotel }}>

        <HomePage></HomePage>

      </HotelContext.Provider>
    </AuthContext.Provider>

  );
};

