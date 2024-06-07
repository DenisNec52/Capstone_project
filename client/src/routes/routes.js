import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Componente che richiede l'autenticazione per accedere al contenuto
export const RequireAuth = ({ children }) => {
  // Ottieni lo stato di autenticazione dall'applicazione
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  
  // Se l'utente è autenticato, mostra il contenuto, altrimenti reindirizza alla pagina di login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente che non richiede l'autenticazione per accedere al contenuto
export const NotRequireAuth = ({ children }) => {
  // Ottieni lo stato di autenticazione dall'applicazione
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  
  // Se l'utente è autenticato, reindirizza alla pagina principale, altrimenti mostra il contenuto
  return isAuthenticated ? <Navigate to="/" /> : children;
};
