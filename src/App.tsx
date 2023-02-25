import React , { useEffect , useState } from 'react';
import './App.css';

import ComponentCharacter , {interfaceCharacter} from './components/character';


function App() {

  const [characterApp, setcharacterApp] = useState < any > ( [] );
  const [errormessageApp , seterrormessageApp ] = useState <string | undefined > ();

  const fetchACharacter = async ( id : number ) => {

    try {

      const apiResponse = await fetch ( `https://swapi.dev/api/people/${id}` );
      
      if (apiResponse.status === 200) {

        const dataapiResponse = await apiResponse.json() as { data : interfaceCharacter []}
        setcharacterApp(dataapiResponse);

      } else if (apiResponse.status === 500) {

        seterrormessageApp("Oops... something went wrong, try again 🤕");

      } else if (apiResponse.status === 418 ) { 

        seterrormessageApp("418 I'm a tea pot 🫖 , silly");

      };
      

    } catch (error) {

      console.log(" this error occured : ->->-> "  + error +  " <-<-<- : this error occured ");

    };

  };

  useEffect( () => { fetchACharacter(1) } , [] ) ;

  return (

    <>

      { characterApp && <ComponentCharacter dataCharacter = {characterApp}  /> }

      { errormessageApp && <h2> {` ERROR :  ${ errormessageApp }` } </h2> }

    </>
        
  );

};

export default App;
