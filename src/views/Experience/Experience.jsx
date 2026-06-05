// src/views/Experience/Experience.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaDrupal,
  FaReact,
  FaArrowRight,
} from "react-icons/fa6";

import NavbarDesktop from "../../components/Navbar";
import api from "../../api/axios";

import "./Experience.css";

function Experience() {
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadExperiences = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/experiencia"
        );

        if (!isMounted) {
          return;
        }

        const experiencesData =
          Array.isArray(response.data)
            ? response.data
            : response.data?.data ??
            [];

        setExperiences(
          experiencesData
        );
      } catch (error) {
        console.error(
          "Error loading experiences:",
          error.response?.data ||
          error
        );

        if (isMounted) {
          setExperiences([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadExperiences();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Actualidad";
    }

    const parts =
      dateString.split("-");

    if (parts.length < 2) {
      return dateString;
    }

    const year = parts[0];
    const month = parts[1];

    return `${month}/${year}`;
  };

  const renderIcon = (
    icon,
    color
  ) => {
    const style = {
      color: color || "#2563eb",
    };

    switch (icon) {
      case "fa-brands fa-drupal":
        return (
          <FaDrupal style={style} />
        );

      case "fa-brands fa-react":
        return (
          <FaReact style={style} />
        );

      case "fa-solid fa-code":
      default:
        return (
          <FaCode style={style} />
        );
    }
  };

  const parseDetails = (details) => {
    if (!details) {
      return [];
    }

    return details
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  if (loading) {
    return (
      <div className="desktop-experience-loader-wrapper">
        <div className="desktop-experience-loader"></div>
      </div>
    );
  }

  return (
    <>
      <NavbarDesktop />

      <section className="desktop-experience">
        <div className="container">
          <div className="desktop-experience-header">
            <h1 className="desktop-experience-title">
              EXPERIENCIA
              PROFESIONAL
            </h1>

            <div className="desktop-experience-line"></div>
          </div>

          <div className="desktop-experience-timeline">
            {experiences.map(
              (
                experience,
                index
              ) => (
                <div
                  key={
                    experience.id
                  }
                  className="desktop-experience-item"
                >
                  <div className="desktop-experience-left">
                    <div className="desktop-experience-icon">
                      {renderIcon(
                        experience.icon,
                        experience.color
                      )}
                    </div>

                    {index !==
                      experiences.length -
                      1 && (
                        <div className="desktop-experience-divider"></div>
                      )}
                  </div>

                  <div className="desktop-experience-content">
                    <h3>
                      {
                        experience.position
                      }
                    </h3>

                    <h4>
                      {
                        experience.company
                      }

                      <span>
                        {formatDate(
                          experience.start_date
                        )}{" "}
                        -{" "}
                        {experience.currently_working
                          ? "Actualidad"
                          : formatDate(
                            experience.end_date
                          )}
                      </span>
                    </h4>

                    {experience.description && (
                      <p>
                        {
                          experience.description
                        }
                      </p>
                    )}

                    {parseDetails(
                      experience.details
                    ).length >
                      0 && (
                        <ul>
                          {parseDetails(
                            experience.details
                          ).map(
                            (
                              detail,
                              detailIndex
                            ) => (
                              <li
                                key={
                                  detailIndex
                                }
                              >
                                {
                                  detail
                                }
                              </li>
                            )
                          )}
                        </ul>
                      )}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="desktop-experience-next">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/educacion"
                )
              }
              className="desktop-experience-next-btn"
              aria-label="Ir a Educación"
            >
              <span>
                Ir a Educación
              </span>

              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Experience;