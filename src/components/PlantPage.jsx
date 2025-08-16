import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const BASE_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all plants on start
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(BASE_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setPlants(data);
      })
      .catch((err) => {
        console.error("Failed to load plants:", err);
        setError("Failed to load plants. Is the server running on :6001?");
      })
      .finally(() => setLoading(false));
  }, []);

  // Add a new plant (after POST in NewPlantForm succeeds)
  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  // Toggle sold out (client-side)
  function handleToggleSoldOut(id) {
    setPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, soldOut: !p.soldOut } : p))
    );
  }

  // Search filter
  const visiblePlants = plants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search value={search} onChange={setSearch} />

      {loading && <p>Loading plants…</p>}
      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <PlantList plants={visiblePlants} onToggleSoldOut={handleToggleSoldOut} />
          {plants.length === 0 && <p>No plants yet.</p>}
          {plants.length > 0 && visiblePlants.length === 0 && <p>No matches.</p>}
        </>
      )}
    </main>
  );
}

export default PlantPage;
