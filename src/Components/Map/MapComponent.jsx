// import React, { useState, useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setLocation(userLocation);

//           if (map) {
//             map.flyTo([userLocation.latitude, userLocation.longitude], 13);
//             L.marker([userLocation.latitude, userLocation.longitude]).addTo(map);
//           }
//         },
//         (error) => {
//           setError(`Error getting location: ${error.message}`);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by your browser.');
//     }
//   }, [map]);

//   useEffect(() => {
//     // Create a Leaflet map when the component mounts
//     const leafletMap = L.map('map').setView([0, 0], 2); // Default view, will be updated later

//     // Add a tile layer (you may want to replace this with your own API key)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors',
//     }).addTo(leafletMap);

//     setMap(leafletMap);

//     return () => {
//       // Cleanup code when the component unmounts
//       leafletMap.remove();
//     };
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   return (
//     <div>
//       <div id="map" style={{ height: '400px' }}></div>
//       {location ? (
//         // <p>
//         //   Your current location is: <br />
//         //   Latitude: {location.latitude} <br />
//         //   Longitude: {location.longitude}
//         // </p>
//         <></>
//       ) : (
//         <p>{error || 'Getting your location...'}</p>
//       )}
//     </div>
//   );
// };

// export default MapComponent;


import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config';

const MapComponent = () => {
  const [locations, setLocations] = useState([])
  const getLocation = async() => {
    try{
      const location = collection(db, "shoplocation")
      const querySnapshot = await getDocs(location)
            const usersInRange = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
              setLocations(usersInRange)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])
  const center = [0, 0]; // Default center
  // const locations = [
  //   { name: "Location A", latitude: 34.0522, longitude: -118.2437 },
  //   { name: "Location B", latitude: 40.7128, longitude: -74.006 },
  //   { name: "Location C", latitude: 41.8781, longitude: -87.6298 },
  // ]
  return (
    <MapContainer center={center} zoom={2} style={{ height: '400px', width:"90%", margin:"auto", marginTop:"20px", zIndex:"000" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>{location.shopname}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
