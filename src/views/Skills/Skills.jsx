// src/views/Skills/Skills.jsx

import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import NavbarDesktop from "../../components/Navbar";

import api from "../../api/axios";

import "devicon/devicon.min.css";

import "./Skills.css";

function Skills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSkills = async () => {
      try {
        setLoading(true);

        const response = await api.get("/habilidades");

        if (!isMounted) {
          return;
        }

        setSkills(response.data?.data || []);
      } catch (error) {
        console.error("Error loading skills:", error);

        if (isMounted) {
          setSkills([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSkills();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="desktop-skills-loader-wrapper">
        <div className="desktop-skills-loader"></div>
      </div>
    );
  }

  if (!skills.length) {
    return (
      <div className="desktop-skills-loader-wrapper">
        <p className="desktop-skills-error">
          No se encontraron tecnologías registradas.
        </p>
      </div>
    );
  }

  return (
    <>
      <NavbarDesktop />

      <section className="desktop-skills">
        <div className="container">
          {/* HEADER */}

          <div className="desktop-skills-header">
            <h1 className="desktop-skills-title">
              TECNOLOGÍAS Y COMPETENCIAS
            </h1>

            <div className="desktop-skills-line"></div>

            <p className="desktop-skills-description">
              Tecnologías, herramientas y competencias utilizadas en el
              desarrollo de aplicaciones modernas, administración de sistemas y
              soporte técnico profesional.
            </p>
          </div>

          {/* SKILLS */}

          <div className="row g-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="col-12 col-md-6 col-xl-6"
              >
                <div className="desktop-skills-card">
                  {/* ICON */}

                  <div className="desktop-skills-icon">
                    <i className={skill.icon}></i>
                  </div>

                  {/* CONTENT */}

                  <div className="desktop-skills-content">
                    <h3>{skill.name}</h3>

                    <ul
                      dangerouslySetInnerHTML={{
                        __html: skill.description || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NEXT BUTTON */}

          <div className="desktop-skills-next">
            <button
              type="button"
              onClick={() => navigate("/servicios")}
              className="desktop-skills-next-btn"
            >
              <span>Ir a Servicios</span>

              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;