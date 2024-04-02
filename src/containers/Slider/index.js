import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
// import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus ? data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) : [] // Ajouter un condition ternaire pour voir si data.focus est bien disponible sinon assigné tableau vide
  

  // Permet de gérer le défilement automatique du slider chaque 5s
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  // Gérer le rendu
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`${byDateDesc[idx].title}`}>
          <article
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {/* Utilisation de l'objet Date en js pour obtenir le mois depuis la date """""format ISO 8601""""" */}
                <div>{new Date(event.date).toLocaleString('default', { month: 'long' })}</div>
              </div>
            </div>
          </article>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${byDateDesc[radioIdx].title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;