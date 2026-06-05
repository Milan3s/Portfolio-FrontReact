// src/views/Education/Education.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBuildingColumns,
  FaFileLines,
  FaCalendarDays,
  FaCircleCheck,
  FaBriefcase,
  FaStar,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa6";

import Navbar from "../../components/Navbar";
import api from "../../api/axios";

import "./Education.css";

function Education() {
  const navigate = useNavigate();

  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadEducation = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/formacion"
        );

        if (!isMounted) {
          return;
        }

        const educationData =
          Array.isArray(response.data)
            ? response.data
            : response.data?.data ??
            [];

        const visibleData =
          educationData.filter(
            (item) => item.is_visible
          );

        const academic =
          visibleData.filter(
            (item) =>
              item.type ===
              "graduate"
          );

        const coursesData =
          visibleData.filter(
            (item) =>
              item.type === "udemy"
          );

        setEducation(
          academic
        );

        setCourses(
          coursesData
        );

        setError(false);
      } catch (error) {
        console.error(
          "Error loading education:",
          error.response?.data ||
          error
        );

        if (isMounted) {
          setEducation([]);

          setCourses([]);

          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEducation();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="desktop-education-loader-wrapper">
        <div className="desktop-education-loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="desktop-education-loader-wrapper">
        <p className="desktop-education-error">
          No se pudo cargar la educación.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="desktop-education">
        <div className="container">

          <div className="desktop-education-header">
            <h1 className="desktop-education-title">
              EDUCACIÓN
            </h1>

            <div className="desktop-education-line"></div>

            <p className="desktop-education-description">
              Formación académica, estudios técnicos y cursos
              especializados relacionados con desarrollo web,
              backend, software y tecnologías modernas.
            </p>
          </div>

          <div className="desktop-education-section">

            <div className="desktop-education-section-title">
              <FaBuildingColumns />
              <span>Formación Académica</span>
            </div>

            <div className="desktop-education-table-wrapper">

              <table
                id="education-table"
                className="desktop-education-table desktop-education-academic-table"
              >
                <thead>
                  <tr>
                    <th>TITULACIÓN</th>

                    <th>
                      <FaBuildingColumns />
                      CENTRO
                    </th>

                    <th>
                      <FaFileLines />
                      PLAN
                    </th>

                    <th>
                      <FaCalendarDays />
                      PROMOCIÓN
                    </th>

                    <th>
                      <FaCircleCheck />
                      ESTADO
                    </th>

                    <th>
                      <FaBriefcase />
                      FCT
                    </th>

                    <th>
                      <FaStar />
                      NOTA FINAL
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {education.length > 0 ? (
                    education.map((item) => (
                      <tr key={item.id}>

                        <td>
                          <div className="desktop-education-degree">

                            <div className="desktop-education-degree-icon">

                              <i
                                className={item.icon}
                                style={{
                                  color:
                                    item.color || "#2563eb",
                                }}
                              ></i>

                            </div>

                            <div>
                              <h3>
                                {item.title || "-"}
                              </h3>

                              <span>
                                {item.subtitle || "-"}
                              </span>
                            </div>

                          </div>
                        </td>

                        <td>

                          <div className="desktop-education-center">

                            <h4>
                              {item.institution || "-"}
                            </h4>

                            <span>
                              {item.location || "-"}
                            </span>

                          </div>

                        </td>

                        <td className="desktop-education-center-text">
                          {item.plan || "-"}
                        </td>

                        <td className="desktop-education-center-text">
                          {item.start_year && item.end_year
                            ? `${item.start_year} - ${item.end_year}`
                            : "-"}
                        </td>

                        <td className="desktop-education-center-text education-status">
                          {item.status || "-"}
                        </td>

                        <td className="desktop-education-center-text education-fct">
                          {item.fct_status || "-"}
                        </td>

                        <td className="desktop-education-project">
                          {item.project_grade || "-"}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="desktop-education-center-text"
                      >
                        No hay formación académica disponible.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>

            </div>

          </div>

          <div className="desktop-education-section">

            <div className="desktop-education-section-title">
              <FaCertificate />
              <span>
                Cursos y Especializaciones
              </span>
            </div>

            <div className="desktop-education-table-wrapper">

              <table
                id="courses-table"
                className="desktop-education-table desktop-education-courses-table"
              >
                <thead>
                  <tr>
                    <th>CURSO</th>

                    <th>
                      <FaBuildingColumns />
                      PLATAFORMA
                    </th>

                    <th>
                      <FaFileLines />
                      ESPECIALIZACIÓN
                    </th>

                    <th>
                      <FaCalendarDays />
                      AÑO
                    </th>

                    <th>
                      <FaCircleCheck />
                      ESTADO
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {courses.length > 0 ? (
                    courses.map((item) => (
                      <tr key={item.id}>

                        <td>

                          <div className="desktop-education-course">

                            <div className="desktop-education-course-icon">

                              <i
                                className={item.icon}
                                style={{
                                  color:
                                    item.color || "#2563eb",
                                }}
                              ></i>

                            </div>

                            <div>
                              <h3>
                                {item.title || "-"}
                              </h3>
                            </div>

                          </div>

                        </td>

                        <td className="desktop-education-center-text">
                          {item.provider || "-"}
                        </td>

                        <td className="desktop-education-center-text">
                          {item.certificate_type || item.subtitle || "-"}
                        </td>

                        <td className="desktop-education-center-text">
                          {item.end_year || "-"}
                        </td>

                        <td className="desktop-education-center-text education-status">
                          {item.status || "-"}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="desktop-education-center-text"
                      >
                        No hay cursos disponibles.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>

            </div>

          </div>

          <div className="desktop-education-next">

            <button
              onClick={() => navigate("/habilidades")}
              className="desktop-education-next-btn"
            >
              <span>
                Ir a Habilidades
              </span>

              <FaArrowRight />
            </button>

          </div>

        </div>
      </section>
    </>
  );
}

export default Education;