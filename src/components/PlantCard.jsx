import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const { id, name, image, price, soldOut = false } = plant;

  // If your db uses "./images/...", normalize to "/images/..."
  const imgSrc = image?.startsWith("./") ? image.slice(1) : image;

  return (
    <li className="card" data-testid="plant-item">
      <img src={imgSrc} alt={name} />
      <h4>{name}</h4>
      {/* EXACT text the tests expect: "Price: <value>" */}
      <p>Price: {price}</p>

      {soldOut ? (
        <button onClick={() => onToggleSoldOut(id)}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={() => onToggleSoldOut(id)}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;
