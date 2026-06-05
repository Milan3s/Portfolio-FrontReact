// src/views/About/About.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaRocket,
  FaShieldHalved,
  FaUser,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa6";

import NavbarDesktop from "../../components/Navbar";

import api, {
  AVATAR_URL,
  PDFS_URL,
} from "../../api/axios";

import "./About.css";

function About() {
  const navigate = useNavigate();

  const [hero, setHero] = useState(null);

  const [highlights, setHighlights] = useState([]);

  const [loading, setLoading] = useState(true);

  // USE EFFECT

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);

        const [
          heroResponse,
          highlightsResponse,
        ] = await Promise.all([
          api.get("/principal"),
          api.get("/destacados-principales"),
        ]);

        if (!isMounted) {
          return;
        }

        const heroData =
          Array.isArray(heroResponse.data)
            ? heroResponse.data[0]
            : heroResponse.data?.data?.[0] ??
            heroResponse.data?.data ??
            heroResponse.data ??
            null;

        const highlightsData =
          Array.isArray(highlightsResponse.data)
            ? highlightsResponse.data
            : highlightsResponse.data?.data ??
            [];

        setHero(heroData);

        setHighlights(highlightsData);
      } catch (error) {
        console.error(
          "Error loading about data:",
          error.response?.data || error
        );

        if (isMounted) {
          setHero(null);

          setHighlights([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // RENDER ICON

  const renderIcon = (icon) => {
    switch (icon) {
      case "fa-code":
        return <FaCode />;

      case "fa-rocket":
        return <FaRocket />;

      case "fa-shield-halved":
        return <FaShieldHalved />;

      default:
        return <FaCode />;
    }
  };

  // DOWNLOAD CV

  const handleDownloadCV = () => {
    if (!hero?.secondary_cta_link) {
      return;
    }

    const link =
      document.createElement("a");

    link.href =
      `${PDFS_URL}/${hero.secondary_cta_link}`;

    link.setAttribute(
      "download",
      hero.secondary_cta_link
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // VIEW CV

  const handleViewCV = () => {
    if (!hero?.secondary_cta_link) {
      return;
    }

    window.open(
      `${PDFS_URL}/${hero.secondary_cta_link}`,
      "_blank"
    );
  };

  // LOADING

  if (loading) {
    return (
      <div className="desktop-about-loader-wrapper">
        <div className="desktop-about-loader"></div>
      </div>
    );
  }

  // NOT FOUND

  if (!hero) {
    return (
      <div className="desktop-about-loader-wrapper">
        <p className="desktop-about-error">
          Error loading content
        </p>
      </div>
    );
  }

  // SPLIT TITLE

  const titleParts =
    hero.title?.split(" ") || [];

  const firstWord =
    titleParts[0] || "";

  const remainingWords =
    titleParts.slice(1).join(" ");

  return (
    <>
      {/* NAVBAR */}

      <NavbarDesktop />

      {/* ABOUT */}

      <section className="desktop-about">
        <div className="container">
          <div className="row align-items-center gy-5">

            {/* IMAGE */}

            <div className="col-12 col-lg-5 order-1 order-lg-2">
              <div className="desktop-about-image-wrapper">
                <img
                  src={`${AVATAR_URL}/${hero.image_url}`}
                  alt={hero.title}
                  className="desktop-about-image img-fluid"
                />
              </div>
            </div>

            {/* CONTENT */}

            <div className="col-12 col-lg-7 order-2 order-lg-1">
              <div className="desktop-about-content">

                {/* GREETING */}

                <span className="desktop-about-subtitle">
                  {hero.greeting}
                </span>

                {/* TITLE */}

                <h1 className="desktop-about-title">
                  {firstWord}

                  <span>
                    {remainingWords}
                  </span>
                </h1>

                {/* SUBTITLE */}

                {hero.subtitle && (
                  <h2 className="desktop-about-secondary-title">
                    {hero.subtitle}
                  </h2>
                )}

                {/* LINE */}

                <div className="desktop-about-line"></div>

                {/* DESCRIPTION */}

                <p className="desktop-about-description">
                  {hero.description}
                </p>


                {/* FEATURES */}

                <div className="desktop-about-features">
                  {highlights.map(
                    (highlight) => (
                      <div
                        key={highlight.id}
                        className="desktop-about-feature"
                      >
                        <div className="desktop-about-feature-icon">
                          {renderIcon(
                            highlight.icon
                          )}
                        </div>

                        <div>
                          <h5>
                            {highlight.title}
                          </h5>

                          <p>
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* BUTTONS */}

                <div className="desktop-about-buttons">

                  <button
                    className="desktop-about-btn-primary"
                    onClick={handleViewCV}
                  >
                    <FaUser />

                    <span>
                      Ver CV
                    </span>
                  </button>

                  <button
                    className="desktop-about-btn-outline"
                    onClick={handleDownloadCV}
                  >
                    <FaDownload />

                    <span>
                      Descargar CV
                    </span>
                  </button>

                </div>

                {/* NEXT PAGE */}

                <div className="desktop-about-next">
                  <button
                    onClick={() =>
                      navigate(
                        "/experiencia"
                      )
                    }
                    className="desktop-about-next-btn"
                  >
                    <span>
                      Ir a Experiencia
                    </span>

                    <FaArrowRight />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default About;