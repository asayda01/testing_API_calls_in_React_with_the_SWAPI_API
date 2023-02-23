import React , { useEffect , useState } from 'react';
import './App.css';
import axios from "axios";

import { interfaceCharacter } from './components/character';
import { async } from 'q';

function App() {

  const [characterApp, setcharacterApp] = useState <Array<interfaceCharacter> | React.ReactNode> ();

  const fetchACharacter = async (id:number) => {

    try {

      const apiResponse = await axios.get(`https://swapi.dev/api/people/${id}`);
      setcharacterApp(apiResponse.data);
      console.log(characterApp);

    } catch (error) {

      console.log(" this error is catched : ->->-> "  + error +  " <-<-<- : this error is catched ")
    }

  }

  useEffect( () => {fetchACharacter(1) },[]);

  console.log(characterApp);

  return (

    <>

      The Selected Character is : {characterApp }

    </>
        
  );

};

export default App;
