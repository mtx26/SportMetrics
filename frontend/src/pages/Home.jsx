import { getProtectedData } from "../api";

function Home() {
    getProtectedData();
    
    return (
      <div>
        <h1>Accueil</h1>
        <p>Bienvenue sur la page d'accueil !</p>
      </div>


    );
  }
  
  export default Home;
  