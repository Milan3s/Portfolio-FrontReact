// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* VIEWS */

import Home from "./views/Home/Home";
import About from "./views/About/About";
import Experience from "./views/Experience/Experience";
import Education from "./views/Education/Education";
import Skills from "./views/Skills/Skills";
import Services from "./views/Services/Services";
import Projects from "./views/Projects/Projects";
import Contact from "./views/Contact/Contact";
import Email from "./views/Email/Email";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* INICIO */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* SOBRE MÍ */}

        <Route
          path="/sobre-mi"
          element={<About />}
        />

        {/* EXPERIENCIA */}

        <Route
          path="/experiencia"
          element={<Experience />}
        />

        {/* EDUCACIÓN */}

        <Route
          path="/educacion"
          element={<Education />}
        />

        {/* HABILIDADES */}

        <Route
          path="/habilidades"
          element={<Skills />}
        />

        {/* SERVICIOS */}

        <Route
          path="/servicios"
          element={<Services />}
        />

        {/* PROYECTOS */}

        <Route
          path="/proyectos"
          element={<Projects />}
        />

        {/* CONTACTO */}

        <Route
          path="/contacto"
          element={<Contact />}
        />

        {/* EMAIL */}

        <Route
          path="/email"
          element={<Email />}
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}