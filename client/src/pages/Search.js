import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook per ottenere i parametri dell'URL
import { useDispatch, useSelector } from "react-redux";
import { getSavedPins, searchPins } from "../actions/pin"; // Importazione delle azioni per ottenere e cercare i Pin
import NavBar from "../components/NavBar"; // Importazione della barra di navigazione
import PinGrid from "../components/PinGrid"; // Importazione del componente per visualizzare i Pin

const Search = () => {
  const dispatch = useDispatch(); // Hook useDispatch per inviare azioni Redux
  const params = useParams(); // Hook per ottenere i parametri dell'URL
  const user = useSelector((state) => state.session.user); // Ottenimento delle informazioni sull'utente dalla Redux store
  const userId = user.id; // ID dell'utente corrente

  // Effetto per ottenere i Pin salvati dell'utente corrente e cercare i Pin corrispondenti alla query
  useEffect(() => {
    dispatch(getSavedPins({ userId, useAsFeed: false })); // Dispatch per ottenere i Pin salvati
    dispatch(searchPins(params.query)); // Dispatch per cercare i Pin corrispondenti alla query
  }, [dispatch, params.query, userId]);

  const { feed, saved } = useSelector((state) => state.pin); // Ottenimento dei Pin dalla Redux store

  return (
    <div>
      {/* Barra di navigazione con la query di ricerca */}
      <NavBar query={params.query} />

      {/* Visualizzazione dei Pin corrispondenti alla ricerca */}
      <PinGrid userId={userId} photoUrls={feed} savedPins={saved} />
    </div>
  );
};

export default Search;
