import React from "react";
import Masonry from "react-masonry-css";
import "./PinGrid.css";
import Pin from "./Pin";

const PinGrid = ({ userId, photoUrls, savedPins }) => {
  // Calcola i breakpoint per il layout Masonry in base al numero di colonne desiderate
  const breakpoints = { default: 4 };
  const baseWidth = 503;
  const increment = 252;
  for (let i = 0; i < 30; i++) {
    breakpoints[baseWidth + increment * i] = i + 1;
  }

  return (
    <div>
      {/* Verifica se sono presenti URL delle foto */}
      {photoUrls && (
        // Layout Masonry per visualizzare le foto in modo responsivo
        <Masonry breakpointCols={breakpoints} className="masonry-grid">
          {/* Mappa attraverso gli URL delle foto e renderizza un componente Pin per ciascuno */}
          {photoUrls.map((photoUrl, index) => (
            <Pin
              key={index}
              userId={userId}
              photoUrl={photoUrl}
              // Verifica se la foto è stata salvata dall'utente
              isSaved={savedPins.includes(photoUrl)}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default PinGrid;
