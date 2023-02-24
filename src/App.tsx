import React , { useEffect , useState } from 'react';
import './App.css';
import axios from "axios";

import ComponentCharacter from './components/character';
import { async } from 'q';

function App() {

  const [characterApp, setcharacterApp] = useState < any > ( [] );

  const fetchACharacter = async ( id : number ) => {

    try {

      const apiResponse = await axios.get( `https://swapi.dev/api/people/${id}` );
      setcharacterApp(apiResponse.data);

    } catch (error) {

      console.log(" this error occured : ->->-> "  + error +  " <-<-<- : this error occured ");

    };

  };

  useEffect( () => { fetchACharacter(1) } , [] ) ;

  return (

    <>

      <ComponentCharacter dataCharacter={characterApp}  />

    </>
        
  );

};

export default App;
