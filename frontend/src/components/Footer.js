import { Link } from "react-router-dom";

function Footer({ user, isAdmin }) {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">&copy; 2025 mtx_26 - Tous droits réservés.</p>
        <p className="mb-1">Ce site est un projet personnel et n'a aucun lien officiel avec [Nom du club].</p>
        <p className="mb-2">Les données collectées sont uniquement utilisées pour l'affichage des présences.</p>
        
        <nav className="d-flex justify-content-center mb-2">
          <Link to="/" className="text-white me-3">Accueil</Link>
          <Link to="/" className="text-white me-3">Title</Link>
          {user && isAdmin && <Link to="/admin" className="text-white">Administration</Link>}
        </nav>

        <p className="small">
          <a href="mailto:mtx_26@outlook.be" className="text-white me-3">Contact</a>
          <a href="https://github.com/mtx26/Changelog-generator/blob/php/LICENSE" className="text-white" target="_blank" rel="noreferrer">Licence MIT</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
