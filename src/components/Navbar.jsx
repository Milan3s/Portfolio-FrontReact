// src/components/Navbar.jsx

import { useState } from "react";

import {
    FaHouse,
    FaUser,
    FaBuilding,
    FaGraduationCap,
    FaLayerGroup,
    FaBriefcase,
    FaCode,
    FaEnvelope,
    FaBars,
    FaXmark,
} from "react-icons/fa6";

import {
    Link,
    useLocation,
} from "react-router-dom";

import "../assets/css/NavbarDesktop.css";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    const links = [
        {
            path: "/",
            label: "Inicio",
            icon: <FaHouse />
        },
        {
            path: "/sobre-mi",
            label: "Sobre mí",
            icon: <FaUser />
        },
        {
            path: "/experiencia",
            label: "Experiencia",
            icon: <FaBuilding />
        },
        {
            path: "/educacion",
            label: "Educación",
            icon: <FaGraduationCap />
        },
        {
            path: "/habilidades",
            label: "Habilidades",
            icon: <FaLayerGroup />
        },
        {
            path: "/servicios",
            label: "Servicios",
            icon: <FaBriefcase />
        },
        {
            path: "/proyectos",
            label: "Proyectos",
            icon: <FaCode />
        }
    ];

    return (
        <header>

            <nav className="navbar navbar-expand-lg bg-white fixed-top border-bottom border-light-subtle py-3 navbar-desktop">

                <div className="container">

                    {/* LOGO */}

                    <Link
                        to="/"
                        className="navbar-brand fw-bold fs-4 text-dark"
                    >

                        David Milanés

                    </Link>

                    {/* MOBILE BUTTON */}

                    <button
                        className="navbar-toggler border-0 shadow-none"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                    >

                        {isOpen ? (
                            <FaXmark className="fs-2 text-dark" />
                        ) : (
                            <FaBars className="fs-4 text-dark" />
                        )}

                    </button>

                    {/* MENU */}

                    <div
                        className={`collapse navbar-collapse ${isOpen ? "show" : ""
                            }`}
                    >

                        {/* LINKS */}

                        <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-2 py-4 py-lg-0">

                            {links.map((link, index) => (

                                <li
                                    key={index}
                                    className="nav-item"
                                >

                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-medium ${location.pathname === link.path
                                            ? "active bg-dark text-white"
                                            : "text-dark"
                                            }`}
                                    >

                                        <span className="small">

                                            {link.icon}

                                        </span>

                                        <span className="small">

                                            {link.label}

                                        </span>

                                    </Link>

                                </li>

                            ))}

                        </ul>

                        {/* CONTACT */}

                        <div className="d-flex justify-content-lg-end pb-4 pb-lg-0">

                            <Link
                                to="/contacto"
                                onClick={() => setIsOpen(false)}
                                className={`btn rounded-pill px-4 d-flex align-items-center gap-2 ${location.pathname === "/contacto"
                                        ? "btn-dark"
                                        : "btn-outline-dark"
                                    }`}
                            >

                                <FaEnvelope />

                                <span>

                                    Contacto

                                </span>

                            </Link>

                        </div>

                    </div>

                </div>

            </nav>

        </header>
    );
}

export default Navbar;