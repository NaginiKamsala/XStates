import React, { useState, useEffect } from "react";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch all countries on component mount
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error("Error fetching states:", error));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Select Location</h1>

      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {selectedCountry && selectedState && selectedCity && (
          <h3>
            You Selected {selectedCity}, {selectedState}, {selectedCountry}
          </h3>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;
