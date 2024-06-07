import React, { useState } from "react";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import "./Pin.css";
import { savePin, deleteSavedPin } from "../actions/pin";

// Stili per il modal
const Dialog = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Sfondo per il modal
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

// Componente del pulsante di salvataggio
const SaveButton = ({ userId, photoUrl, isSaved }) => {
  const dispatch = useDispatch();
  
  const handleOnClick = (event) => {
    event.preventDefault();
    // Se è già salvato, cancella il pin, altrimenti salvalo
    isSaved
      ? dispatch(deleteSavedPin({ userId, photoUrl }))
      : dispatch(savePin({ userId, photoUrl }));
  };

  return (
    <button
      onClick={handleOnClick}
      className={`save-btn ${
        isSaved ? "save-btn--active" : "save-btn--inactive"
      }`}
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

// Componente del pin con modal per la visualizzazione ingrandita
const Pin = ({ userId, photoUrl, isSaved }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [showButton, setShowButton] = useState(false);

  return (
    <div>
      <div className="pin__wrapper">
        {/* Contenitore del pin con immagine e pulsante di salvataggio */}
        <div
          className="pin__container"
          onMouseOver={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          {/* Immagine del pin con apertura del modal al clic */}
          <div onClick={handleOpenDialog}>
            <img src={`${photoUrl}&w=236`} alt="" />
          </div>
          {/* Mostra il pulsante di salvataggio quando il mouse è sopra il pin */}
          {showButton && (
            <SaveButton userId={userId} photoUrl={photoUrl} isSaved={isSaved} />
          )}
        </div>
      </div>
      {/* Modal per la visualizzazione ingrandita del pin */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        BackdropComponent={Backdrop}
      >
        <div className="dialog__container">
          {/* Immagine ingrandita del pin */}
          <img src={`${photoUrl}&w=400`} alt="" />
          {/* Pulsante di salvataggio nel modal */}
          <SaveButton userId={userId} photoUrl={photoUrl} isSaved={isSaved} />
        </div>
      </Dialog>
    </div>
  );
};

export default Pin;
