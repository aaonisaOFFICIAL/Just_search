import React, { useState, useEffect } from 'react';

const Geolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(userLocation);
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {location ? (
        <p>
          Your current location is: <br />
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : (
        <p>{error || 'Getting your location...'}</p>
      )}
    </div>
  );
};

export default Geolocation;

