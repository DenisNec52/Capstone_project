import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getSavedPins, getRandomPins } from "../actions/pin";
import PinGrid from "../components/PinGrid";

const Home = () => {
  const dispatch = useDispatch(); // Hook useDispatch per inviare azioni Redux
  const user = useSelector((state) => state.session.user); // Hook useSelector per ottenere lo stato dell'utente
  const userId = user.id; // ID dell'utente attualmente loggato

  // Effetto per caricare i pin salvati e i pin casuali quando il componente viene montato o l'ID dell'utente cambia
  useEffect(() => {
    // Dispatch per ottenere i pin salvati dell'utente
    dispatch(getSavedPins({ userId, setAsFeed: false }));
    // Dispatch per ottenere i pin casuali per la home
    dispatch(getRandomPins());
  }, [dispatch, userId]); // Dipendenze dell'effetto: dispatch e userId

  // Ottenimento dei pin salvati e casuali dallo stato Redux
  const { feed, saved } = useSelector((state) => state.pin);

  return (
    <div>
      {/* Passaggio dei pin alla griglia dei pin come props */}
      <PinGrid userId={userId} photoUrls={feed} savedPins={saved} />
    </div>
  );
};

export default Home;
