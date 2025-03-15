import { Link } from "react-router-dom";

function Header({ user, isAdmin, handleLogout, handleLogin }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🏠 Accueil</Link>
          <Link className="navbar-brand d-none d-lg-block" to="/">🎂 Title</Link>
          {user && isAdmin && <Link className="navbar-brand d-none d-lg-block" to="/admin">⛔ Administration</Link>}

          <div className="d-none d-lg-flex align-items-center ms-auto">
            {user ? (
              <>
                <span className="navbar-text me-3 text-white">
                  Connecté en tant que <span className="text-primary">{user.email}</span>
                </span>
                <button onClick={handleLogout} className="btn btn-danger">Se déconnecter</button>
              </>
            ) : (
              <button onClick={handleLogin} className="btn btn-primary">Se connecter</button>
            )}
          </div>

          <button className="navbar-toggler d-lg-none ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end text-bg-dark" id="navbarOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">🏠 Accueil</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/">🎂 Title</Link></li>
            {user && isAdmin && <li className="nav-item"><Link className="nav-link" to="/admin">⛔ Administration</Link></li>}
            <hr className="dropdown-divider" />
            {user ? (
              <>
                <li className="nav-item"><span className="nav-link text-white">Connecté en tant que <span className="ms-2 text-primary">{user.email}</span></span></li>
                <li className="nav-item"><button onClick={handleLogout} className="btn btn-danger w-100">Se déconnecter</button></li>
              </>
            ) : (
              <li className="nav-item"><button onClick={handleLogin} className="btn btn-primary w-100">Se connecter</button></li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
