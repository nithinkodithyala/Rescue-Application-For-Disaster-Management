import React, { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import './MapComponents.css'; // Import your CSS file for styling



const MapComponent = () => {
  const [userData, setUserData] = useState([]);
  const [map, setMap] = useState(null); // State to store the map instance



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user-data');
        const data = await response.json();
        const updatedUserData = data.map((user) => ({
          name: user.CenterName,
          latitude: user.latitude,
          longitude: user.longitude,
        }));
        const updatedmailData = data.map((user) => ({
          name: user.CenterName,
          email: user.email,
        }));
        setUserData(updatedUserData);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!map) {
      const newMap = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(newMap);

      setMap(newMap);
    }

    const showPresentLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            if (map) {
              map.setView([latitude, longitude], 15);
            }

            const customIcon = L.divIcon({ className: 'dynamic-marker' });
            L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

            displayStaticMarkers();
            
            document.getElementById('showMarkersButton').addEventListener('click', () => {
              clearMarkers();
            //   console.log(mail, userData);
            //   sendEmailsToServer(mail, latitude, longitude);
            });
          },
          (error) => {
            console.error('Error getting the present location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }
    };

    const displayStaticMarkers = () => {
      const staticMarkers = userData.map((user) => ({
        name: user.name,
        latitude: parseFloat(user.latitude),
        longitude: parseFloat(user.longitude),
      }));

      staticMarkers.forEach((marker) => {
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: blue" class="marker"></div>`,
        });

        if (map) {
          L.marker([marker.latitude, marker.longitude], { icon: customIcon })
            .addTo(map)
            .bindPopup(
              `<strong>${marker.name}</strong><br/>Latitude: ${marker.latitude}<br/>Longitude: ${marker.longitude}`
            )
            .openPopup();
        }
      });
    };


    const clearMarkers = () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };
    // Call the function to show the present location and set up the button event listener
    showPresentLocation();
    // return () => {
    //   document.getElementById('showMarkersButton').removeEventListener('click', () => {});
    // };
    // Clean up on component unmount
   
  }, [map, userData]); // Include map and userData as dependencies for this useEffect

  return (            
      <div id="map"></div>
  );
};

export default MapComponent;
