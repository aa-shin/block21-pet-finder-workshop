import { useState } from "react";

import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [dogName, setDogName] = useState("_");
  const [query, setQuery] = useState("");

  async function handleSearchAllPets() {
    const response = await fetch("/api/v1/pets");
    const pets = await response.json();
    setResults(pets);
  }

  async function handleSearchByName(name) {
    const response = await fetch(`/api/v1/pets/${name}`);
    const pet = await response.json();
    setResults(pet);
    setDogName("_");
  }

  async function handleSearchByQueryString() {
    const response = await fetch(`/api/v1/pets/owner?name=${query}`);
    const pets = await response.json();
    setResults(pets);
    setQuery("");
  }

  return (
    <div
      className="App"
      style={{ display: "flex", height: "90vh", width: "100vw" }}
    >
      <div style={{ flex: 1, maxWidth: "35vw" }}>
        <h2>What Are You Looking For?</h2>
        <div>
          <h2>Find All Pets</h2>
          <button onClick={() => handleSearchAllPets()}>All Pets</button>
        </div>
        <div>
          <h2>Find Pet By Name</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <input
              value={dogName === "_" ? "" : dogName}
              placeholder="Pet Name..."
              onChange={(e) => setDogName(e.target.value)}
              style={{ padding: "8px 16px" }}
            />
            <button onClick={() => handleSearchByName(dogName)}>Search</button>
          </div>
          <div>
            <h2>Find Owner By Query String</h2>
            <input
              value={query}
              placeholder="Owner Name..."
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: "8px 16px" }}
            />
            <button onClick={() => handleSearchByQueryString()}>Search</button>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, border: "2px solid white", maxWidth: "50vw" }}>
        <h2 style={{ textAlign: "center" }}>Results</h2>
        <ul>
          {results.length > 0
            ? results.map((pet) => (
                <li key={pet.id}>
                  <h3>Name: {pet.name}</h3>
                  <h5>Breed: {pet.breed}</h5>
                  <h5>Age: {pet.age}</h5>
                  <h5>Owner: {pet.owner}</h5>
                  <h5>Phone #: {pet.telephone}</h5>
                </li>
              ))
            : "No Pets Found"}
        </ul>
      </div>
    </div>
  );
}

export default App;