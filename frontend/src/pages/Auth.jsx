import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { useLocation } from "react-router-dom";
import { GoogleHandleLogin, registerWithEmail, loginWithEmail } from "../services/authService";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const location = useLocation();

  const [justifyActive, setJustifyActive] = useState(location.pathname === "/register" ? "tab2" : "tab1");

  useEffect(() => {
    const newTab = location.pathname === "/register" ? "tab2" : "tab1";
    setJustifyActive(newTab);
  }, [location.pathname]); // ✅ Plus d'erreur ESLint

  const handleJustifyClick = (value) => {
    if (value !== justifyActive) {
      setJustifyActive(value);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex justify-content-center">
      <MDBCard style={{ maxWidth: "500px", width: "100%", borderRadius: "1rem" }} className="shadow">
        <MDBCardBody className="p-4">

          {/* Onglets bien répartis */}
          <MDBTabs pills className="mb-3 d-flex w-100">
            <MDBTabsItem className="w-50 text-center">
              <MDBTabsLink 
                onClick={() => handleJustifyClick('tab1')} 
                active={justifyActive === 'tab1'}
                className="w-100"
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem className="w-50 text-center">
              <MDBTabsLink 
                onClick={() => handleJustifyClick('tab2')} 
                active={justifyActive === 'tab2'}
                className="w-100"
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          {/* Contenu des onglets */}
          <MDBTabsContent>


            {/* Login Tab */}
            <MDBTabsPane open={justifyActive === 'tab1'}>
              <div className="text-center mb-3">
                <p>Sign in with:</p>
                <div className='d-flex justify-content-center'>
                  <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'red' }} onClick={() => GoogleHandleLogin()}>
                    <MDBIcon fab icon='google' size="lg"/>
                  </MDBBtn>
                </div>
                <p className="text-center mt-3">or:</p>
              </div>

              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={(e) => setEmail(e.target.value)} />
              <div className="position-relative d-flex align-items-center">
                <MDBInput
                  wrapperClass="w-100"
                  label="Password"
                  id="passwordInput"
                  type={passwordVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBIcon 
                  icon={passwordVisible ? "eye-slash" : "eye"}
                  className="position-absolute"
                  style={{
                    right: "15px",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#6c757d"
                  }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>

              <div className="d-flex justify-content-between mb-4">
                <a href="/reset-password">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100" onClick={() => loginWithEmail(email, password)}>Sign in</MDBBtn>
            </MDBTabsPane>



            {/* Register Tab */}
            <MDBTabsPane open={justifyActive === 'tab2'}>
              <div className="text-center mb-3">
                <p>Sign up with:</p>
                <div className='d-flex justify-content-center'>
                  <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'red' }} onClick={() => GoogleHandleLogin()}>
                    <MDBIcon fab icon='google' size="lg"/>
                  </MDBBtn>
                </div>
                <p className="text-center mt-3">or:</p>
              </div>

              <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' onChange={(e) => setName(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e) => setEmail(e.target.value)}/>
              <div className="mb-4 position-relative d-flex align-items-center">
                <MDBInput
                  wrapperClass="w-100"
                  label="Password"
                  id="passwordInput"
                  type={passwordVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBIcon 
                  icon={passwordVisible ? "eye-slash" : "eye"}
                  className="position-absolute"
                  style={{
                    right: "15px",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#6c757d"
                  }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
              </div>

              <MDBBtn className="mb-4 w-100" onClick={() => registerWithEmail(email, password, name)}>Sign up</MDBBtn>
            </MDBTabsPane>
          </MDBTabsContent>

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
