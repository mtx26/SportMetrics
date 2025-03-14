import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./style.css";

function App() {
  // Simule l'utilisateur et son rôle (remplace par ton système d'auth réel)
  const user = "mtx_26";
  const isAdmin = true;

  return (
    <HelmetProvider>
      <Router>
        <div className="bg-light d-flex flex-column min-vh-100">
          <Header user={user} isAdmin={isAdmin} />
          <div className="container flex-grow-1 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer user={user} isAdmin={isAdmin} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
