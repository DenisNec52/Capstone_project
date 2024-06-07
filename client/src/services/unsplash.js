import axios from "axios";

// Creazione di un'istanza Axios per le richieste all'API di Unsplash
const instance = axios.create({
  baseURL: "https://api.unsplash.com", // URL di base dell'API di Unsplash
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`, // Chiave di accesso all'API di Unsplash
  },
});

// Funzione per effettuare una ricerca di immagini su Unsplash
export const search = async (params) => {
  // Effettua una richiesta GET all'API di Unsplash con i parametri specificati
  return await instance.get(`/search/photos/`, { params });
};

// Funzione per ottenere immagini casuali da Unsplash
export const random = async (params) => {
  // Effettua una richiesta GET all'API di Unsplash per ottenere immagini casuali con i parametri specificati
  return await instance.get(`/photos/random/`, { params });
};
