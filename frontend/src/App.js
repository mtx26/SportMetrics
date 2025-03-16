import React, { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter"; // Import du routing
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style.css";
import { listenToAuthChanges } from "./services/authService";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Correction ici

const App = () => {

  const [user, setUser] = useState(null);
  const isAdmin = false;
  

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router> {/* ✅ Assure que BrowserRouter entoure toute l'application */}
      <div id="root">
        <Header isAdmin={isAdmin} user={user} />
        <main className="main-content">
          <AppRouter user={user} />
        </main>
        <Footer isAdmin={isAdmin} user={user} />
      </div>
    </Router>
  );
};

export default App;
