import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FaArrowRight,
    FaCloud,
    FaCode,
    FaDatabase,
    FaDesktop,
    FaGithub,
    FaLayerGroup,
    FaMagnifyingGlass,
    FaMobileScreen,
    FaPlay,
    FaGraduationCap
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../api/axios";

import "./Projects.css";

function Projects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [selectedType, setSelectedType] = useState("Todos");

    const [currentPage, setCurrentPage] = useState(1);

    const [filtersCount, setFiltersCount] = useState({
        all: 0,
        frontend: 0,
        backend: 0,
        api: 0,
        desktop: 0,
        mobile: 0,
        fullStack: 0,
    });

    const projectsPerPage = 3;

    const filters = [
        {
            label: "Todos",
            icon: <FaLayerGroup />,
            count: filtersCount.all,
        },
        {
            label: "Frontend",
            icon: <FaCode />,
            count: filtersCount.frontend,
        },
        {
            label: "Backend",
            icon: <FaDatabase />,
            count: filtersCount.backend,
        },
        {
            label: "API",
            icon: <FaCloud />,
            count: filtersCount.api,
        },
        {
            label: "Desktop",
            icon: <FaDesktop />,
            count: filtersCount.desktop,
        },
        {
            label: "Mobile",
            icon: <FaMobileScreen />,
            count: filtersCount.mobile,
        },
        {
            label: "Full Stack",
            icon: <FaLayerGroup />,
            count: filtersCount.fullStack,
        },
        {
            label: "TFG",
            icon: <FaGraduationCap />,
            count: filtersCount.tfg,
        },
    ];

    useEffect(() => {

    const loadProjects = async () => {

        try {

            setLoading(true);

            setError(null);

            const response = await api.get("/proyectos");

            const projectsData =
                response?.data?.data ?? [];

            setProjects(
                projectsData
            );

            setFiltersCount({
                ...(response?.data?.filters ?? {
                    all: 0,
                    frontend: 0,
                    backend: 0,
                    api: 0,
                    desktop: 0,
                    mobile: 0,
                    fullStack: 0,
                }),

                tfg: 2,
            });

        } catch (err) {

            console.error(
                "Error loading projects:",
                err
            );

            setProjects([]);

            setFiltersCount({
                all: 0,
                frontend: 0,
                backend: 0,
                api: 0,
                desktop: 0,
                mobile: 0,
                fullStack: 0,
                tfg: 2,
            });

            setError(
                "No se pudieron cargar los proyectos."
            );

        } finally {

            setLoading(false);

        }

    };

    loadProjects();

}, []);

    const handleSearch = (
        event
    ) => {
        setSearch(event.target.value);

        setCurrentPage(1);
    };

    const handleFilter = (
        type
    ) => {

        setSelectedType(type);

        setCurrentPage(1);
    };

    const filteredProjects =
    useMemo(() => {

        const query =
            search.trim().toLowerCase();

        return projects.filter(
            (project) => {

                const technologiesText =
                    project.technologies?.replace(/<[^>]*>/g, "").toLowerCase() ?? "";

                const matchesSearch =
                    project.title?.toLowerCase().includes(query) ||
                    project.description?.toLowerCase().includes(query) ||
                    technologiesText.includes(query);

                const isTFG =
                    project.title?.includes("(DAW)") ||
                    project.title?.includes("(DAM)");

                const matchesType =
                    selectedType === "Todos"
                        ? true
                        : selectedType === "TFG"
                            ? isTFG
                            : project.type?.toLowerCase() === selectedType.toLowerCase();

                return (
                    matchesSearch &&
                    matchesType
                );
            }
        );

    }, [projects, search, selectedType]);

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));

    const safeCurrentPage = Math.min(currentPage, totalPages);

    const startIndex = (safeCurrentPage - 1) * projectsPerPage;

    const visibleProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

    const changePage = (page) => {

        if (
            page < 1 ||
            page > totalPages
        ) {
            return;
        }

        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <Navbar />

            <section className="desktop-projects">

                <div className="container">

                    <div className="desktop-projects-header">

                        <div className="desktop-projects-title-content">

                            <h1 className="desktop-projects-title">

                                MIS PROYECTOS

                            </h1>

                            <div className="desktop-projects-line" />

                        </div>

                        <p className="desktop-projects-description">

                            Algunos de los proyectos en los que he trabajado,
                            aplicando tecnologías modernas para crear
                            soluciones eficientes y escalables.

                        </p>

                    </div>

                    {loading && (

                        <div className="desktop-projects-loader-wrapper">

                            <div className="desktop-projects-loader" />

                        </div>

                    )}

                    {error && (

                        <div className="desktop-projects-error">

                            {error}

                        </div>

                    )}

                    {!loading && !error && (

                        <>

                            <div className="desktop-projects-filters">

                                {filters.map((filter) => (

                                    <button
                                        key={filter.label}
                                        type="button"
                                        className={
                                            selectedType === filter.label
                                                ? "desktop-project-filter active"
                                                : "desktop-project-filter"
                                        }
                                        onClick={() =>
                                            handleFilter(
                                                filter.label
                                            )
                                        }
                                    >

                                        {filter.icon}

                                        <span>

                                            {filter.label}

                                        </span>

                                        <div className="desktop-project-filter-count">

                                            {filter.count}

                                        </div>

                                    </button>

                                ))}

                            </div>

                            <div className="desktop-projects-search-wrapper">

                                <div className="desktop-projects-search">

                                    <FaMagnifyingGlass />

                                    <input
                                        type="text"
                                        value={search}
                                        placeholder="Buscar proyecto..."
                                        onChange={handleSearch}
                                    />

                                </div>

                            </div>

                            <div className="row g-4">

                                {visibleProjects.map((project) => (

                                    <div
                                        key={project.id}
                                        className="col-12 col-md-6 col-xl-4"
                                    >

                                        <article className="desktop-project-card">

                                            <div className="desktop-project-card-icon-section">

                                                <div className="desktop-project-card-icon">

                                                    <i className={project.icon} />

                                                </div>

                                            </div>

                                            <div className="desktop-project-card-title-section">

                                                <h2 className="desktop-project-card-title">

                                                    {project.title}

                                                </h2>

                                            </div>

                                            <div className="desktop-project-card-description-section">

                                                <p className="desktop-project-card-description">

                                                    {project.description}

                                                </p>

                                            </div>

                                            <div className="desktop-project-card-technologies-section">

                                                <div
                                                    className="desktop-project-technologies"
                                                    dangerouslySetInnerHTML={{
                                                        __html: project.technologies ?? "",
                                                    }}
                                                />

                                            </div>

                                            <div className="desktop-project-card-footer">

                                                <div className="desktop-project-card-actions">

                                                    {project.github_url && (

                                                        <a href={project.github_url} target="_blank" rel="noreferrer" className="desktop-project-btn" >

                                                            <FaGithub /> <span> GitHub </span>

                                                        </a>

                                                    )}

                                                    {project.video_url && (

                                                        <a
                                                            href={project.video_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="desktop-project-btn"
                                                        >

                                                            <FaPlay />

                                                            <span>

                                                                Ver Proyecto

                                                            </span>

                                                        </a>

                                                    )}

                                                    {project.status?.trim() &&
                                                        project.status !== "Disponible" && (

                                                            <button
                                                                type="button"
                                                                className="desktop-project-btn disabled"
                                                            >
                                                                {project.status}
                                                            </button>

                                                        )}

                                                </div>

                                            </div>

                                        </article>

                                    </div>

                                ))}

                            </div>

                            {filteredProjects.length === 0 && (

                                <div className="desktop-projects-empty">

                                    No se encontraron proyectos.

                                </div>

                            )}

                            {totalPages > 1 && (

                                <div className="desktop-projects-pagination-wrapper">

                                    <div className="desktop-projects-pagination">

                                        <button
                                            className="desktop-pagination-btn"
                                            disabled={safeCurrentPage === 1}
                                            onClick={() => changePage(1)}
                                        >

                                            Primero

                                        </button>

                                        <button
                                            className="desktop-pagination-btn"
                                            disabled={
                                                safeCurrentPage === totalPages
                                            }
                                            onClick={() =>
                                                changePage(
                                                    safeCurrentPage + 1
                                                )
                                            }
                                        >

                                            Siguiente

                                        </button>

                                        <div className="desktop-pagination-counter">

                                            {safeCurrentPage}
                                            /
                                            {totalPages}

                                        </div>

                                        <button
                                            className="desktop-pagination-btn"
                                            disabled={
                                                safeCurrentPage === totalPages
                                            }
                                            onClick={() =>
                                                changePage(totalPages)
                                            }
                                        >

                                            Último

                                        </button>

                                        <button
                                            className="desktop-pagination-btn"
                                            disabled={safeCurrentPage === 1}
                                            onClick={() =>
                                                changePage(
                                                    safeCurrentPage - 1
                                                )
                                            }
                                        >

                                            Anterior

                                        </button>

                                    </div>

                                </div>

                            )}

                            <div className="desktop-projects-mobile-contact">

                                <button
                                    type="button"
                                    className="desktop-projects-mobile-contact-btn"
                                    onClick={() =>
                                        navigate("/contacto")
                                    }
                                >

                                    <span>

                                        Contacto

                                    </span>

                                    <FaArrowRight />

                                </button>

                            </div>

                        </>

                    )}

                </div>

            </section>
        </>
    );
}

export default Projects;