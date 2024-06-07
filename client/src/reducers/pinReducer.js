import {
  FETCH_SAVED_PINS,
  SET_FEED,
  SAVE_PIN,
  DELETE_SAVED_PIN,
} from "../actions/pin"; // Importa le costanti delle azioni relative ai pin

// Stato iniziale del riduttore per i pin
const INITIAL_STATE = {
  feed: [], // Elenco dei pin visualizzati nell'alimentazione (feed)
  saved: [], // Elenco dei pin salvati dall'utente
};

// Riduttore per gestire lo stato dei pin
const pinReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SAVED_PINS:
      // Azione per recuperare i pin salvati dall'utente
      return {
        ...state, // Mantieni lo stato attuale
        saved: action.photoUrls, // Aggiorna l'elenco dei pin salvati con i nuovi pin recuperati
      };
    case SET_FEED:
      // Azione per impostare i pin nell'alimentazione (feed)
      return {
        ...state, // Mantieni lo stato attuale
        feed: action.photoUrls, // Aggiorna l'elenco dei pin nell'alimentazione con i nuovi pin
      };
    case SAVE_PIN:
      // Azione per salvare un nuovo pin
      return {
        ...state, // Mantieni lo stato attuale
        saved: [...state.saved, action.photoUrl], // Aggiungi il nuovo pin all'elenco dei pin salvati
      };
    case DELETE_SAVED_PIN:
      // Azione per eliminare un pin salvato
      return {
        ...state, // Mantieni lo stato attuale
        saved: state.saved.filter((url) => url !== action.photoUrl), // Rimuovi il pin dall'elenco dei pin salvati
      };
    default:
      return state; // Restituisci lo stato attuale per azioni non gestite
  }
};

export default pinReducer; // Esporta il riduttore dei pin
