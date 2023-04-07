import React, { useState } from 'react';
import './App.css';
import HomePage from './Pages/homePage';
import { AuthContext, Tuser } from './Context/auth.context';

export default function App() {
  const [user, setUser] = useState<Tuser | null>(null);
  return (
    
      <AuthContext.Provider value={{
      user: user,
      setUser: setUser
      }}>

      <HomePage></HomePage>

      </AuthContext.Provider>
    
  );
}

{/* <AuthContext.Provider value={{
      user: user,
      setUser: setUser
      }}>

      {user === null && <Accueil></Accueil>}
      {user !== null && <CvAccueil></CvAccueil>}

    </AuthContext.Provider> */}
