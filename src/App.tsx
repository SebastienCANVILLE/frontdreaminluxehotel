import React from 'react';
import './App.css';
import HomePage from './HomePage/homePage';

export default function App() {
  return (
    <div>

      <HomePage></HomePage>

    </div>
  );
}

{/* <AuthContext.Provider value={{
      user: user,
      setUser: setUser
      }}>

      {user === null && <Accueil></Accueil>}
      {user !== null && <CvAccueil></CvAccueil>}

    </AuthContext.Provider> */}
