import axios from "axios";

// Creazione di un'istanza Axios per le richieste relative agli utenti
export const instance = axios.create({
  baseURL: "/api/users", // URL di base per le richieste agli utenti
});

// Funzione per la registrazione di un nuovo utente
export const signup = async (userData) => {
  // Effettua una richiesta POST per registrare un nuovo utente con i dati specificati
  return await instance.post("/signup", userData);
};

// Funzione per l'accesso di un utente
export const login = async (userData) => {
  // Effettua una richiesta POST per l'accesso di un utente con le credenziali specificate
  return await instance.post("/login", userData);
};

// Funzione per ottenere il profilo di un utente
export const getProfile = async (userId) => {
  // Effettua una richiesta GET per ottenere il profilo di un utente con l'ID specificato
  return await instance.get(`/${userId}`);
};

// Funzione per salvare un pin per un utente
export const savePin = async ({ userId, photoUrl }) => {
  // Effettua una richiesta PUT per salvare un pin per l'utente con l'ID specificato e l'URL dell'immagine
  return await instance.put(`/${userId}/save-pin`, { photoUrl });
};

// Funzione per eliminare un pin salvato da un utente
export const deleteSavedPin = async ({ userId, photoUrl }) => {
  // Effettua una richiesta PUT per eliminare un pin salvato dall'utente con l'ID specificato e l'URL dell'immagine
  return await instance.put(`/${userId}/delete-pin`, { photoUrl });
};
