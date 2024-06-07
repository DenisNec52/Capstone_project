import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPins } from "../actions/pin"; // Importazione dell'azione per ottenere i Pin salvati
import PinGrid from "../components/PinGrid"; // Importazione del componente per visualizzare i Pin
import ProfileHeader from "../components/ProfileHeader"; // Importazione dell'intestazione del profilo

const Profile = () => {
  const dispatch = useDispatch(); // Hook useDispatch per inviare azioni Redux
  const user = useSelector((state) => state.session.user); // Ottenimento delle informazioni sull'utente dalla Redux store
  const userId = user.id; // ID dell'utente corrente

  // Effetto per ottenere i Pin salvati dell'utente corrente
  useEffect(() => {
    dispatch(getSavedPins({ userId, setAsFeed: true })); // Dispatch per ottenere i Pin salvati
  }, [dispatch, userId]);

  const { feed, saved } = useSelector((state) => state.pin); // Ottenimento dei Pin salvati dalla Redux store

  return (
    <div>
      {/* Intestazione del profilo con le informazioni sull'utente */}
      <ProfileHeader user={user} />

      {/* Verifica se ci sono Pin salvati */}
      {feed.length
        ? <PinGrid userId={userId} photoUrls={feed} savedPins={saved} /> // Visualizzazione dei Pin se ci sono
        : <h3>This user has not saved any pins.</h3> // Messaggio se l'utente non ha salvato alcun Pin
      }
    </div>
  );
};

export default Profile;
