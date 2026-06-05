import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaBriefcase, FaCode, FaClock } from "react-icons/fa6";

import NavbarDesktop from "../../components/Navbar";
import api, { AVATAR_URL } from "../../api/axios";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [home, setHome] = useState(null);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchHome = async () => {
      try {
        setLoading(true);

        const [homeResponse, projectsResponse] = await Promise.all([
          api.get("/inicio/1"),
          api.get("/proyectos/total"),
        ]);

        if (!isMounted) {
          return;
        }

        setHome(homeResponse.data.data);
        setProjectsCount(projectsResponse.data.count ?? 0);
      } catch (error) {
        console.error("Error loading home:", error);

        if (isMounted) {
          setHome(null);
          setProjectsCount(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHome();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="desktop-home-loader-wrapper">
        <div className="desktop-home-loader"></div>
      </div>
    );
  }

  if (!home) {
    return (
      <div className="desktop-home-loader-wrapper">
        <p className="desktop-home-error">
          No se pudo cargar el inicio.
        </p>
      </div>
    );
  }

  const logoUrl = home.logo_url
    ? `${AVATAR_URL}/${home.logo_url}`
    : "/logo-placeholder.png";

  return (
    <>
      <NavbarDesktop />

      <section id="desktop-home-section" className="desktop-home">
        <div className="container">
          <div className="desktop-home-content">
            <div className="desktop-home-hero">
              <div className="desktop-home-logo-wrapper">
                <img
                  src={logoUrl}
                  alt={home.full_name}
                  className="desktop-home-logo"
                />
              </div>

              <div className="desktop-home-title-block">
                <h1 className="desktop-home-title">
                  {home.full_name}
                </h1>

                <div className="desktop-home-title-line-wrapper">
                  <div className="desktop-home-title-line-accent"></div>
                  <div className="desktop-home-title-line"></div>
                </div>
              </div>

              <div className="desktop-home-tagline-wrapper">
                <span className="desktop-home-tagline">
                  {home.headline}
                </span>
              </div>

              <div className="desktop-home-description-wrapper">
                <p className="desktop-home-description">
                  {home.description}
                </p>
              </div>
            </div>

            <div className="desktop-home-stats">
              <div className="desktop-home-stat-card">
                <div className="desktop-home-stat-icon">
                  <FaBriefcase />
                </div>

                <div className="desktop-home-stat-info">
                  <h3>{home.years_experience ?? 0}</h3>
                  <span>Años de experiencia</span>
                </div>
              </div>

              <div className="desktop-home-stat-card">
                <div className="desktop-home-stat-icon">
                  <FaCode />
                </div>

                <div className="desktop-home-stat-info">
                  <h3>{projectsCount}</h3>
                  <span>Proyectos completados</span>
                </div>
              </div>

              <div className="desktop-home-stat-card">
                <div className="desktop-home-stat-icon">
                  <FaClock />
                </div>

                <div className="desktop-home-stat-info">
                  <h3>
                    {home.is_active ? "Disponible" : "Ocupado"}
                  </h3>

                  <span>
                    {home.is_active
                      ? "Abierto a nuevas oportunidades"
                      : "Actualmente trabajando en proyectos"}
                  </span>
                </div>
              </div>
            </div>

            <div className="desktop-home-meta">
              <div className="desktop-home-meta-item">
                <span>Creado</span>
                <strong>
                  {formatDate(home.created_at)}
                </strong>
              </div>

              <span className="desktop-home-meta-divider">
                |
              </span>

              <div className="desktop-home-meta-item">
                <span>Actualizado</span>
                <strong>
                  {formatDate(home.updated_at)}
                </strong>
              </div>
            </div>

            <div className="desktop-home-next">
              <button
                onClick={() => navigate("/sobre-mi")}
                className="desktop-home-next-btn"
              >
                <span>Ir a Sobre mí</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;