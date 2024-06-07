import * as unsplashService from "../services/unsplash"; // Importazione del servizio per Unsplash
import * as userService from "../services/users"; // Importazione del servizio per gli utenti

// Costanti per le azioni
export const FETCH_SAVED_PINS = "FETCH_SAVED_PINS";
export const SET_FEED = "SET_FEED";
export const SAVE_PIN = "SAVE_PIN";
export const DELETE_SAVED_PIN = "DELETE_SAVED_PIN";

// Azione per ottenere i pin salvati
export const getSavedPins = ({ userId, setAsFeed }) => async (dispatch) => {
  // Chiamata al servizio per ottenere il profilo dell'utente
  const response = await userService.getProfile(userId);
  // Dispatcia l'azione per aggiornare i pin salvati
  dispatch({
    type: FETCH_SAVED_PINS,
    photoUrls: response.data.savedPins,
  });
  // Se richiesto, imposta i pin salvati anche come feed
  if (setAsFeed) {
    dispatch({
      type: SET_FEED,
      photoUrls: response.data.savedPins,
    });
  }
};

// Azione per cercare pin
export const searchPins = (query) => async (dispatch) => {
  // Chiamata al servizio di ricerca di Unsplash
  const response = await unsplashService.search({ query, per_page: 30 });
  // Estrae le URL delle immagini dai risultati della ricerca
  const photoUrls = response.data.results.map((photo) => photo.urls.raw);
  // Dispatcia l'azione per impostare il feed con i pin trovati
  dispatch({
    type: SET_FEED,
    photoUrls: photoUrls,
  });
};

// Azione per ottenere pin casuali
export const getRandomPins = () => async (dispatch) => {
  // Chiamata al servizio per ottenere pin casuali da Unsplash
  const response = await unsplashService.random({ count: 30 });
  // Estrae le URL delle immagini dai pin casuali ottenuti
  const photoUrls = response.data.map((photo) => photo.urls.raw);
  // Dispatcia l'azione per impostare il feed con i pin casuali ottenuti
  dispatch({
    type: SET_FEED,
    photoUrls: photoUrls,
  });
};

// Azione per salvare un pin
export const savePin = ({ userId, photoUrl }) => async (dispatch) => {
  // Chiamata al servizio per salvare un pin per l'utente specificato
  await userService.savePin({ userId, photoUrl });
  // Dispatcia l'azione per aggiornare lo stato con il pin salvato
  dispatch({
    type: SAVE_PIN,
    photoUrl: photoUrl,
  });
};

// Azione per eliminare un pin salvato
export const deleteSavedPin = ({ userId, photoUrl }) => async (dispatch) => {
  // Chiamata al servizio per eliminare un pin salvato per l'utente specificato
  await userService.deleteSavedPin({ userId, photoUrl });
  // Dispatcia l'azione per rimuovere il pin salvato dallo stato
  dispatch({
    type: DELETE_SAVED_PIN,
    photoUrl: photoUrl,
  });
};
