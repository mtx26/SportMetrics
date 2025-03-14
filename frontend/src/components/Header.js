import { Link } from "react-router-dom";

function Header({ user, isAdmin }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">🏠 Accueil</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">🎂 Title</Link>
              </li>
              {user && isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">⛔ Administration</Link>
                </li>
              )}
            </ul>

            <div className="ms-auto d-none d-lg-block">
              {user ? (
                <span className="navbar-text text-white me-3">
                  Connecté en tant que <span className="text-primary">{user}</span>
                </span>
              ) : null}
              <Link to={user ? "/logout" : "/login"} className={`btn ${user ? "btn-outline-danger" : "btn-outline-primary"}`}>
                {user ? "Se déconnecter" : "Se connecter"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas menu pour mobile */}
      <div className="offcanvas offcanvas-end text-bg-dark" id="navbarOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark">
              <Link className="nav-link text-white" to="/">🏠 Accueil</Link>
            </li>
            <li className="list-group-item bg-dark">
              <Link className="nav-link text-white" to="/">🎂 Title</Link>
            </li>
            {user && isAdmin && (
              <li className="list-group-item bg-dark">
                <Link className="nav-link text-white" to="/admin">⛔ Administration</Link>
              </li>
            )}
            <hr className="dropdown-divider" />
            {user ? (
              <>
                <li className="list-group-item bg-dark text-white">
                  Connecté en tant que <span className="text-primary">{user}</span>
                </li>
                <li className="list-group-item bg-dark">
                  <Link to="/logout" className="btn btn-outline-danger w-100">Se déconnecter</Link>
                </li>
              </>
            ) : (
              <li className="list-group-item bg-dark">
                <Link to="/login" className="btn btn-outline-primary w-100">Se connecter</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
