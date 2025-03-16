import React from 'react';
import { Link } from "react-router-dom";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useUser } from "../contexts/UserContext";

function Footer() {

  const { userInfo } = useUser();
  
  return (
    <MDBFooter bgColor='dark' className='text-white text-center text-lg-start'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Retrouvez-nous sur les réseaux :</span>
        </div>
        <div>
          <a href='https://github.com/mtx26' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" /> mtx_26
              </h6>
              <p>Projet Open Source développé par mtx_26.</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Navigation</h6>
              <p><Link to="/" className='text-reset'>Accueil</Link></p>
              <p><Link to="/" className='text-reset'>Title</Link></p>
              {userInfo && userInfo?.role === "admin" && <p><Link to="/admin" className='text-reset'>Administration</Link></p>}
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Liens utiles</h6>
              <p><a href='mailto:mtx_26@outlook.be' className='text-reset'>Contact</a></p>
              <p>
                <a href='https://github.com/mtx26/Changelog-generator/blob/php/LICENSE' className='text-reset' target="_blank" rel="noreferrer">
                  Licence MIT
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2025 mtx_26 - Tous droits réservés.
      </div>
    </MDBFooter>
  );
}

export default Footer;
