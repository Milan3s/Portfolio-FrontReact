// src/views/Services/Services.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa6";

import Navbar from "../../components/Navbar";

import api from "../../api/axios";

import "devicon/devicon.min.css";

import "./Services.css";

function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        setLoading(true);

        const response = await api.get("/servicios");

        if (!isMounted) {
          return;
        }

        setServices(response.data?.data || []);
      } catch (error) {
        console.error(
          "Error loading services:",
          error,
        );

        if (isMounted) {
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const getAccentClass = (index) => {
    const accents = [
      "purple",
      "blue",
      "green",
      "pink",
      "cyan",
      "orange",
    ];

    return accents[index % accents.length];
  };

  if (loading) {
    return (
      <div className="desktop-services-loader-wrapper">
        <div className="desktop-services-loader"></div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="desktop-services-loader-wrapper">
        <p className="desktop-services-error">
          No se encontraron servicios.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="desktop-services">
        <div className="container">
          {/* HEADER */}

          <div className="desktop-services-header">
            <h1 className="desktop-services-title">
              MIS SERVICIOS
            </h1>

            <div className="desktop-services-line"></div>

            <p className="desktop-services-description">
              Soluciones tecnológicas orientadas al
              desarrollo web, soporte técnico,
              mantenimiento de sistemas,
              recuperación de plataformas y
              optimización de entornos digitales.
            </p>
          </div>

          {/* SERVICES */}

          <div className="desktop-services-grid">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="desktop-service-card"
              >
                {/* HEADER */}

                <div className="desktop-service-header">
                  <div
                    className={`desktop-service-icon ${getAccentClass(
                      index,
                    )}`}
                  >
                    {service.icon?.startsWith(
                      "devicon",
                    ) ? (
                      <i className={service.icon}></i>
                    ) : (
                      <i
                        className={`fa-solid ${service.icon}`}
                      ></i>
                    )}
                  </div>

                  <div className="desktop-service-title-wrapper">
                    <h3>{service.title}</h3>

                    <div
                      className={`desktop-service-card-line ${getAccentClass(
                        index,
                      )}`}
                    ></div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="desktop-service-description-list">
                  <ul
                    dangerouslySetInnerHTML={{
                      __html:
                        service.description ||
                        "",
                    }}
                  />
                </div>
              </article>
            ))}
          </div>

          {/* MOBILE / TABLET ONLY */}

          <div className="desktop-services-next">
            <button
              type="button"
              onClick={() =>
                navigate("/proyectos")
              }
              className="desktop-services-next-btn"
            >
              <span>Ir a Proyectos</span>

              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;