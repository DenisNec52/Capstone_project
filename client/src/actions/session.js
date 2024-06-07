import jwtDecode from "jwt-decode"; // Importa la libreria per decodificare JWT
import * as userService from "../services/users"; // Importa i servizi degli utenti

// Costanti per le azioni
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const RECEIVE_SESSION_ERROR = "RECEIVE_SESSION_ERROR";
export const CLEAR_SESSION_ERROR = "CLEAR_SESSION_ERROR";

// Funzione per impostare il token di autenticazione nelle intestazioni delle richieste HTTP
export const setAuthToken = (token) => {
  if (token) {
    userService.instance.defaults.headers.common["Authorization"] = token;
  } else {
    delete userService.instance.defaults.headers.common["Authorization"];
  }
};

// Azione per impostare l'utente corrente
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

// Azione per ricevere un errore di sessione
export const receiveError = (error) => ({
  type: RECEIVE_SESSION_ERROR,
  error,
});

// Azione per cancellare un errore di sessione
export const clearError = () => ({
  type: CLEAR_SESSION_ERROR,
});

// Azione per registrare un nuovo utente
export const signup = (userData) => async (dispatch) => {
  try {
    const response = await userService.signup(userData); // Chiamata al servizio di registrazione
    const token = response.data.token; // Estrazione del token dalla risposta
    localStorage.setItem("jwtToken", token); // Memorizzazione del token nel localStorage
    setAuthToken(token); // Impostazione del token nelle intestazioni delle richieste HTTP
    dispatch(setCurrentUser(jwtDecode(token))); // Impostazione dell'utente corrente
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error)); // Gestione degli errori
  }
};

// Azione per effettuare l'accesso di un utente
export const login = (userData) => async (dispatch) => {
  try {
    const response = await userService.login(userData); // Chiamata al servizio di accesso
    const token = response.data.token; // Estrazione del token dalla risposta
    localStorage.setItem("jwtToken", token); // Memorizzazione del token nel localStorage
    setAuthToken(token); // Impostazione del token nelle intestazioni delle richieste HTTP
    dispatch(setCurrentUser(jwtDecode(token))); // Impostazione dell'utente corrente
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error)); // Gestione degli errori
  }
};

// Azione per effettuare il logout di un utente
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken"); // Rimozione del token dal localStorage
  setAuthToken(false); // Rimozione del token dalle intestazioni delle richieste HTTP
  dispatch(setCurrentUser({})); // Impostazione dell'utente corrente a vuoto
};
