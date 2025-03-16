import React, { useState } from "react";
import { handleLogout, useUserInfo } from "../services/authService";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdb-react-ui-kit";

function Navbar({isAdmin, user}) {
  const [showNav, setShowNav] = useState(false);
  const userInfo = useUserInfo();

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        {/* Logo du site */}
        <MDBNavbarBrand href="/">SportMetrics
        </MDBNavbarBrand>

        {/* Contenu du menu */}
        <MDBCollapse navbar>
          <MDBNavbarNav className="me-auto">
            <MDBNavbarItem>
              <MDBNavbarLink href="/accueil">Accueil</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/services">Services</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/contact">Contact</MDBNavbarLink>
            </MDBNavbarItem>
            {user && isAdmin && 
            <MDBNavbarItem>
              <MDBNavbarLink href="/admin">Administration</MDBNavbarLink>
            </MDBNavbarItem>
            }
          </MDBNavbarNav>
        </MDBCollapse>

        {/* Section pour l’icône utilisateur et le bouton burger */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Pseudo de l'utilisateur */}
          {user && <span className="fw-bold">{userInfo?.displayName || "Utilisateur"}</span>}

          {/* Icône Profil avec Dropdown */}
          <MDBDropdown className="me-3">
            <MDBDropdownToggle tag="a" className="nav-link hidden-arrow d-flex align-items-center">
              {userInfo?.photoURL ? (
                <img 
                  src={userInfo?.photoURL} 
                  alt="Profil" 
                  className="rounded-circle" 
                  width="40" 
                  height="40" 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <MDBIcon fas icon="user-circle" style={{ fontSize: "40px" }} />
              )}
            </MDBDropdownToggle>

            {/* Dropdown menu pour utilisateur connecté ou non */}
            <MDBDropdownMenu className="dropdown-menu-end">
              {user ? (
                <>
                  <MDBDropdownItem link href="/profile">Mon profil</MDBDropdownItem>
                  <MDBDropdownItem link href="/settings">Paramètres</MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem link href="/" onClick={handleLogout}>Déconnexion</MDBDropdownItem>
                </>
              ) : (
                <>
                  <MDBDropdownItem link href="/login">Connexion</MDBDropdownItem>
                  <MDBDropdownItem link href="/register">Inscription</MDBDropdownItem>
                </>
              )}
            </MDBDropdownMenu>
          </MDBDropdown>

          {/* Bouton Burger - Ajout d'une icône */}
          <MDBNavbarToggler
            type="button"
            aria-expanded={showNav}
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon="bars" fas size="lg" />
          </MDBNavbarToggler>

        </div>


        {/* Contenu du menu */}
        <MDBCollapse open={showNav} className="w-100">
          <MDBNavbarNav className="ms-auto flex-column">
            <MDBNavbarItem>
              <MDBNavbarLink href="/accueil">Accueil</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/services">Services</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/contact">Contact</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>

      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;