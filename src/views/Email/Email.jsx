// src/views/Email/Email.jsx

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Mail,
  Search,
  Trash2,
  Inbox,
  Ban,
  MailOpen,
  Archive,
  Star,
  User,
  Circle,
  Eye,
  Clock3,
  Send,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Folder,
  Bug,
  FileWarning,
  XCircle,
  BadgeCheck,
  MessageSquare,
  EyeOff,
} from "lucide-react";

import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";

import api from "../../api/axios";

import "./Email.css";

function Email() {
  // ======================================
  // STATE
  // ======================================

  const [emails, setEmails] = useState([]);

  const [selectedEmail, setSelectedEmail] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  // ======================================
  // DELETE MODAL
  // ======================================

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [emailToDelete, setEmailToDelete] = useState(null);

  // ======================================
  // FORMAT DATE
  // ======================================

  const formatDate = (date) => {
    if (!date) {
      return "--/--/----";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "--/--/----";
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");

    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");

    const year = parsedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // ======================================
  // FORMAT DATETIME
  // ======================================

  const formatDateTime = (date) => {
    if (!date) {
      return "--/--/---- --:--";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "--/--/---- --:--";
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");

    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");

    const year = parsedDate.getFullYear();

    const hours = String(parsedDate.getHours()).padStart(2, "0");

    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  // ======================================
  // FETCH EMAILS
  // ======================================

  const fetchEmails = useCallback(async (isMounted = true) => {
    try {
      setLoading(true);

      const response = await api.get("/contacts");

      if (!isMounted) {
        return;
      }

      const data = Array.isArray(response.data) ? response.data : [];

      const orderedEmails = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setEmails(orderedEmails);

      setSelectedEmail((previousSelected) => {
        if (!previousSelected) {
          return orderedEmails[0] || null;
        }

        const existingEmail = orderedEmails.find(
          (item) => item.id === previousSelected.id,
        );

        return existingEmail || orderedEmails[0] || null;
      });
    } catch (error) {
      console.error("[EMAIL] FETCH ERROR:", error);

      if (isMounted) {
        setEmails([]);

        setSelectedEmail(null);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, []);

  // ======================================
  // INIT
  // ======================================

  useEffect(() => {
    let isMounted = true;

    const initializeEmails = async () => {
      await fetchEmails(isMounted);
    };

    initializeEmails();

    return () => {
      isMounted = false;
    };
  }, [fetchEmails]);

  // ======================================
  // FILTER EMAILS
  // ======================================

  const filteredEmails = useMemo(() => {
    let result = [...emails];

    switch (filter) {
      case "unread":
        result = result.filter((email) => !email.isRead);
        break;

      case "spam":
        result = result.filter((email) => email.hidden);
        break;

      default:
        break;
    }

    if (!search.trim()) {
      return result;
    }

    const query = search.trim().toLowerCase();

    return result.filter((email) => {
      return (
        email.name?.toLowerCase().includes(query) ||
        email.email?.toLowerCase().includes(query) ||
        email.subject?.toLowerCase().includes(query) ||
        email.message?.toLowerCase().includes(query)
      );
    });
  }, [emails, search, filter]);

  // ======================================
  // COUNTERS
  // ======================================

  const unreadCount = emails.filter((email) => !email.isRead).length;

  const spamCount = emails.filter((email) => email.hidden).length;

  // ======================================
  // SELECT EMAIL
  // ======================================

  const handleSelectEmail = async (email) => {
    setSelectedEmail(email);

    if (email.isRead) {
      return;
    }

    try {
      await api.patch(`/contacts/${email.id}/read`);

      const updatedEmails = emails.map((item) => {
        if (item.id === email.id) {
          return {
            ...item,
            isRead: true,
          };
        }

        return item;
      });

      setEmails(updatedEmails);

      setSelectedEmail({
        ...email,
        isRead: true,
      });
    } catch (error) {
      console.error("[EMAIL] READ ERROR:", error);
    }
  };

  // ======================================
  // DELETE
  // ======================================

  const handleOpenDeleteModal = (email) => {
    setEmailToDelete(email);

    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);

    setEmailToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!emailToDelete) {
      return;
    }

    try {
      await api.delete(`/contacts/${emailToDelete.id}`);

      const updatedEmails = emails.filter(
        (email) => email.id !== emailToDelete.id,
      );

      setEmails(updatedEmails);

      if (selectedEmail?.id === emailToDelete.id) {
        setSelectedEmail(updatedEmails[0] || null);
      }

      handleCloseDeleteModal();
    } catch (error) {
      console.error("[EMAIL] DELETE ERROR:", error);
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <section className="email-page loading">
        <div className="email-loading-wrapper">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3 mb-0">Cargando correos...</p>
        </div>
      </section>
    );
  }

  // ======================================
  // RENDER
  // ======================================
  return (
    <section className="email-page">
      <div className="email-wrapper">
        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

        <header className="email-header">
          <div className="email-header-left">
            <div className="email-logo">
              <Mail size={22} />
            </div>

            <div>
              <h1 className="email-title">
                BANDEJA REALIDAD
                <span> (Hoy)</span>
              </h1>

              <p className="email-subtitle">
                Así es actualmente: {emails.length} mensajes
              </p>
            </div>
          </div>
        </header>

        {/* ====================================== */}
        {/* TOPBAR */}
        {/* ====================================== */}

        <div className="email-topbar">
          <div className="email-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Buscar correos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ====================================== */}
        {/* BODY */}
        {/* ====================================== */}

        <div className="email-body">
          {/* ====================================== */}
          {/* SIDEBAR */}
          {/* ====================================== */}

          <aside className="email-sidebar">
            <div className="email-sidebar-header">
              <h2>Carpetas</h2>
            </div>

            <div className="email-sidebar-menu">
              <button
                type="button"
                className={`email-sidebar-item ${
                  filter === "all" ? "active" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                <div>
                  <Inbox size={18} />

                  <span>Todos</span>
                </div>

                <small>{emails.length}</small>
              </button>

              <button
                type="button"
                className={`email-sidebar-item ${
                  filter === "unread" ? "active" : ""
                }`}
                onClick={() => setFilter("unread")}
              >
                <div>
                  <MailOpen size={18} />

                  <span>No leídos</span>
                </div>

                <small>{unreadCount}</small>
              </button>

              <button
                type="button"
                className={`email-sidebar-item spam ${
                  filter === "spam" ? "active" : ""
                }`}
                onClick={() => setFilter("spam")}
              >
                <div>
                  <AlertTriangle size={18} />

                  <span>Spam</span>
                </div>

                <small>{spamCount}</small>
              </button>

              <button type="button" className="email-sidebar-item">
                <div>
                  <Star size={18} />

                  <span>Destacados</span>
                </div>

                <small>0</small>
              </button>

              <button type="button" className="email-sidebar-item">
                <div>
                  <Archive size={18} />

                  <span>Archivados</span>
                </div>

                <small>0</small>
              </button>

              <button type="button" className="email-sidebar-item">
                <div>
                  <Folder size={18} />

                  <span>Carpetas</span>
                </div>

                <small>0</small>
              </button>

              <button type="button" className="email-sidebar-item">
                <div>
                  <Trash2 size={18} />

                  <span>Papelera</span>
                </div>

                <small>0</small>
              </button>
            </div>

            {/* STATS */}

            <div className="email-stats-card">
              <div className="email-stats-icon">
                <Mail size={18} />
              </div>

              <div>
                <h3>Mensajes recibidos</h3>

                <strong>{emails.length}</strong>

                <p>Total de correos</p>
              </div>
            </div>
          </aside>

          {/* ====================================== */}
          {/* CONTENT */}
          {/* ====================================== */}

          <main className="email-content">
            {filteredEmails.length === 0 ? (
              <div className="email-empty-state">
                <div className="email-empty-icon">
                  <Mail size={56} />
                </div>

                <h2>Tu bandeja está vacía</h2>

                <p>Aún no has recibido mensajes.</p>

                <small>Los nuevos mensajes aparecerán aquí.</small>
              </div>
            ) : (
              <>
                {/* ====================================== */}
                {/* LIST */}
                {/* ====================================== */}

                <div className="email-messages-list">
                  {filteredEmails.map((email) => (
                    <button
                      key={email.id}
                      type="button"
                      onClick={() => handleSelectEmail(email)}
                      className={`email-message-row ${
                        selectedEmail?.id === email.id ? "active" : ""
                      } ${email.hidden ? "spam" : ""}`}
                    >
                      <div className="email-message-avatar">
                        {email.hidden ? (
                          <AlertTriangle size={16} />
                        ) : (
                          <User size={16} />
                        )}
                      </div>

                      <div className="email-message-info">
                        <div className="email-message-top">
                          <h3>{email.name}</h3>

                          <span>{formatDate(email.createdAt)}</span>
                        </div>

                        <h4>{email.subject || "Sin asunto"}</h4>

                        <p>{email.message}</p>
                      </div>

                      <div className="email-message-status">
                        {!email.isRead ? (
                          <Circle size={10} fill="currentColor" />
                        ) : (
                          <Eye size={14} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* ====================================== */}
                {/* PREVIEW */}
                {/* ====================================== */}

                {selectedEmail ? (
                  <div className="email-preview">
                    {/* HEADER */}

                    <div className="email-preview-header">
                      <div className="email-preview-title-wrapper">
                        <div className="email-preview-toolbar">

                          <button
                            type="button"
                            className="delete"
                            onClick={() => handleOpenDeleteModal(selectedEmail)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <h2>{selectedEmail.subject || "Sin asunto"}</h2>

                        <span className="email-preview-date">
                          <Clock3 size={14} />

                          {formatDateTime(selectedEmail.createdAt)}
                        </span>
                      </div>

                      {selectedEmail.hidden ? (
                        <div className="email-status-spam">
                          <XCircle size={16} />

                          <span>Correo spam</span>
                        </div>
                      ) : (
                        <div className="email-status-safe">
                          <BadgeCheck size={16} />

                          <span>Correo validado</span>
                        </div>
                      )}
                    </div>

                    {/* META */}

                    <div className="email-preview-meta">
                      <div className="email-preview-user">
                        <div className="email-preview-avatar">
                          {selectedEmail.hidden ? (
                            <ShieldAlert size={18} />
                          ) : (
                            <MessageSquare size={18} />
                          )}
                        </div>

                        <div>
                          <h3>{selectedEmail.name}</h3>

                          <p>
                            <Send size={14} />

                            {selectedEmail.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MESSAGE */}

                    <div
                      className={`email-preview-message ${
                        selectedEmail.hidden ? "spam" : ""
                      }`}
                    >
                      <p>{selectedEmail.message || "Sin mensaje"}</p>
                    </div>

                    {/* VALIDATION */}

                    {selectedEmail.hidden ? (
                      <div className="email-validation-box spam">
                        <div className="email-validation-header">
                          <ShieldAlert size={18} />

                          <span>Motivos de bloqueo</span>
                        </div>

                        <ul>
                          <li>
                            <Bug size={14} />
                            Honeypot detectado
                          </li>

                          <li>
                            <FileWarning size={14} />
                            Comportamiento sospechoso
                          </li>

                          <li>
                            <Ban size={14} />
                            Mensaje ocultado
                          </li>

                          <li>
                            <Shield size={14} />
                            Protección backend activa
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="email-validation-box safe">
                        <div className="email-validation-header">
                          <ShieldCheck size={18} />

                          <span>Validación completada</span>
                        </div>

                        <ul>
                          <li>
                            <CheckCircle2 size={14} />
                            Mensaje humano detectado
                          </li>

                          <li>
                            <Shield size={14} />
                            Backend seguro
                          </li>

                          <li>
                            <Sparkles size={14} />
                            Validaciones correctas
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="email-empty-view">
                    <div className="email-empty-icon">
                      <EyeOff size={48} />
                    </div>

                    <h2>No hay correo seleccionado</h2>

                    <p>Selecciona un mensaje de la bandeja.</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        {/* ====================================== */}
        {/* DELETE MODAL */}
        {/* ====================================== */}

        <Modal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar correo</Modal.Title>
          </Modal.Header>

          <Modal.Body>¿Seguro que deseas eliminar este correo?</Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>

            <Button variant="danger" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
}

export default Email;
