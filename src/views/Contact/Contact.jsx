// src/views/Contact/Contact.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../api/axios";

import {
  FaPaperPlane,
  FaRegMessage,
  FaLock,
  FaArrowLeft,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  // =====================================
  // STATE
  // =====================================

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [socialLinks, setSocialLinks] = useState([]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    userId: 1,

    name: "",

    email: "",

    subject: "",

    message: "",

    hidden: "",
  });

  // =====================================
  // INIT
  // =====================================

  useEffect(() => {
    let isMounted = true;

    const initSocialLinks = async () => {
      try {
        const response = await api.get(
          "/redes-sociales"
        );

        if (!isMounted) {
          return;
        }

        const socialLinks =
          Array.isArray(response.data)
            ? response.data
            : response.data?.data ?? [];

        setSocialLinks(
          socialLinks
        );
      } catch {
        if (isMounted) {
          setSocialLinks([]);
        }
      }
    };

    initSocialLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================
  // VALIDATIONS
  // =====================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "El nombre es obligatorio";
    } else if (
      formData.name.trim().length > 255
    ) {
      newErrors.name =
        "El nombre no puede superar los 255 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "El email es obligatorio";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          formData.email.trim()
        )
      ) {
        newErrors.email =
          "Formato de email inválido";
      }

      if (
        formData.email.trim().length >
        255
      ) {
        newErrors.email =
          "El email no puede superar los 255 caracteres";
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject =
        "El asunto es obligatorio";
    } else if (
      formData.subject.trim().length >
      255
    ) {
      newErrors.subject =
        "El asunto no puede superar los 255 caracteres";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        "El mensaje es obligatorio";
    }

    if (
      formData.hidden.trim() !== ""
    ) {
      newErrors.hidden =
        "Spam detectado";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
    setSuccess("");
  };

  // =====================================
  // HANDLE SUBMIT
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        user_id: 1,

        name: formData.name.trim(),

        email: formData.email.trim(),

        subject: formData.subject.trim(),

        message: formData.message.trim(),

        hidden: false,
      };

      await api.post(
        "/contacto",
        payload
      );

      setSuccess(
        "Mensaje enviado correctamente."
      );

      setErrors({});

      setFormData({
        userId: 1,

        name: "",

        email: "",

        subject: "",

        message: "",

        hidden: "",
      });
    } catch (err) {
      let message =
        "No se pudo enviar el mensaje.";

      if (
        err.response?.data?.errors
      ) {
        const backendErrors = {};

        Object.entries(
          err.response.data.errors
        ).forEach(
          ([field, messages]) => {
            backendErrors[field] =
              Array.isArray(messages)
                ? messages[0]
                : messages;
          }
        );

        setErrors(
          backendErrors
        );
      }

      if (
        err.response?.data?.message
      ) {
        message =
          err.response.data.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // SOCIAL LINKS
  // =====================================

  const githubLink =
    socialLinks.find((link) => {
      const platform =
        (
          link.platform ??
          link.name ??
          link.nombre ??
          ""
        )
          .toString()
          .toLowerCase();

      return platform.includes(
        "github"
      );
    });

  const linkedinLink =
    socialLinks.find((link) => {
      const platform =
        (
          link.platform ??
          link.name ??
          link.nombre ??
          ""
        )
          .toString()
          .toLowerCase();

      return platform.includes(
        "linkedin"
      );
    });

  // =====================================
  // RENDER
  // =====================================

  return (
    <>
      <Navbar />

      <section
        id="desktop-contact-section"
        className="desktop-contact"
      >
        <div className="container">
          <div
            id="desktop-contact-layout"
            className="desktop-contact-grid"
          >
            {/* ===================================== */}
            {/* LEFT */}
            {/* ===================================== */}

            <aside
              id="desktop-contact-left-panel"
              className="desktop-contact-left"
            >
              {/* HEADER */}

              <div
                id="desktop-contact-header-block"
                className="desktop-contact-header"
              >
                <h1 className="desktop-contact-title">
                  Contacto
                </h1>

                <div className="desktop-contact-line"></div>

                <p className="desktop-contact-description">
                  ¿Tienes un proyecto en mente o quieres trabajar
                  juntos?
                </p>
              </div>

              {/* SOCIAL LINKS */}

              <div className="desktop-contact-socials">
                {githubLink && (
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="desktop-contact-social"
                  >
                    <div className="desktop-contact-social-icon">
                      <FaGithub />
                    </div>

                    <div className="desktop-contact-social-content">
                      <span>GitHub</span>

                      <small>Ver perfil</small>
                    </div>
                  </a>
                )}

                {linkedinLink && (
                  <a
                    href={linkedinLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="desktop-contact-social"
                  >
                    <div className="desktop-contact-social-icon">
                      <FaLinkedin />
                    </div>

                    <div className="desktop-contact-social-content">
                      <span>LinkedIn</span>

                      <small>Ver perfil</small>
                    </div>
                  </a>
                )}
              </div>

              {/* RESPONSE CARD */}

              <div
                id="desktop-contact-response-card"
                className="desktop-contact-response"
              >
                <div className="desktop-contact-response-icon">
                  <FaPaperPlane />
                </div>

                <div className="desktop-contact-response-content">
                  <h4>Respuesta rápida</h4>

                  <p>
                    Intentaré responder en menos de 24 horas.
                  </p>
                </div>
              </div>
            </aside>

            {/* ===================================== */}
            {/* RIGHT */}
            {/* ===================================== */}

            <main
              id="desktop-contact-form-wrapper"
              className="desktop-contact-right"
            >
              <div
                id="desktop-contact-main-form-card"
                className="desktop-contact-form-card"
              >
                {/* HEADER */}

                <div
                  id="desktop-contact-form-header"
                  className="desktop-contact-form-header"
                >
                  <div className="desktop-contact-form-icon">
                    <FaRegMessage />
                  </div>

                  <div className="desktop-contact-form-header-content">
                    <h2>Envíame un mensaje</h2>

                    <p>
                      Cuéntame sobre tu proyecto y cómo puedo
                      ayudarte.
                    </p>
                  </div>
                </div>

                {/* FORM */}

                <form
                  id="desktop-contact-form"
                  className="desktop-contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* ===================================== */}
                  {/* HIDDEN ANTISPAM */}
                  {/* ===================================== */}

                  <input
                    type="text"
                    name="hidden"
                    value={formData.hidden}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex="-1"
                    className="desktop-contact-hidden-field"
                    aria-hidden="true"
                  />

                  {/* ===================================== */}
                  {/* NAME */}
                  {/* ===================================== */}

                  <div className="desktop-contact-field">
                    <label htmlFor="name">
                      Nombre *
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      maxLength={255}
                      autoComplete="name"
                      className={
                        errors.name
                          ? "desktop-contact-input-error"
                          : ""
                      }
                    />

                    {errors.name && (
                      <small className="desktop-contact-error-text">
                        {errors.name}
                      </small>
                    )}
                  </div>

                  {/* ===================================== */}
                  {/* EMAIL */}
                  {/* ===================================== */}

                  <div className="desktop-contact-field">
                    <label htmlFor="email">
                      Correo electrónico *
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tuemail@gmail.com"
                      maxLength={255}
                      autoComplete="email"
                      className={
                        errors.email
                          ? "desktop-contact-input-error"
                          : ""
                      }
                    />

                    {errors.email && (
                      <small className="desktop-contact-error-text">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  {/* ===================================== */}
                  {/* SUBJECT */}
                  {/* ===================================== */}

                  <div className="desktop-contact-field">
                    <label htmlFor="subject">
                      Asunto *
                    </label>

                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Asunto del mensaje"
                      maxLength={255}
                      className={
                        errors.subject
                          ? "desktop-contact-input-error"
                          : ""
                      }
                    />

                    {errors.subject && (
                      <small className="desktop-contact-error-text">
                        {errors.subject}
                      </small>
                    )}
                  </div>

                  {/* ===================================== */}
                  {/* MESSAGE */}
                  {/* ===================================== */}

                  <div className="desktop-contact-field">
                    <label htmlFor="message">
                      Mensaje *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntame sobre tu proyecto..."
                      className={
                        errors.message
                          ? "desktop-contact-input-error"
                          : ""
                      }
                    ></textarea>

                    {errors.message && (
                      <small className="desktop-contact-error-text">
                        {errors.message}
                      </small>
                    )}
                  </div>

                  {/* ===================================== */}
                  {/* SUCCESS */}
                  {/* ===================================== */}

                  {success && (
                    <div className="desktop-contact-success">
                      {success}
                    </div>
                  )}

                  {/* ===================================== */}
                  {/* ERROR */}
                  {/* ===================================== */}

                  {error && (
                    <div className="desktop-contact-error">
                      {error}
                    </div>
                  )}

                  {/* ===================================== */}
                  {/* SUBMIT */}
                  {/* ===================================== */}

                  <button
                    type="submit"
                    className="desktop-contact-submit"
                    disabled={loading}
                  >
                    <FaPaperPlane />

                    <span>
                      {loading
                        ? "Enviando..."
                        : "Enviar mensaje"}
                    </span>
                  </button>

                  {/* ===================================== */}
                  {/* FOOTER */}
                  {/* ===================================== */}

                  <div className="desktop-contact-footer">
                    <FaLock />

                    <span>
                      Tu información está segura y no será
                      compartida.
                    </span>
                  </div>
                </form>
              </div>

              {/* ===================================== */}
              {/* MOBILE HOME BUTTON */}
              {/* ===================================== */}

              <div className="desktop-contact-mobile-home">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="desktop-contact-mobile-home-btn"
                >
                  <FaArrowLeft />

                  <span>Volver al inicio</span>
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;