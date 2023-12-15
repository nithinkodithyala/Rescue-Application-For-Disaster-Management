import React, { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponents.css'; // Import your CSS file for styling
// import Chatbot from './chat.js';
// import EventEmitter from './EventEmitter'; // Import the event emitter

const getNearestMarkers = (currentLatitude,currentLongitude,limit,userData) => {
  const staticMarkers = userData.map((user) => ({
    name:user.name,
    latitude: parseFloat(user.latitude),
    longitude: parseFloat(user.longitude),
  }));

  // Sort the static markers by distance from the current location
  staticMarkers.sort((a, b) => {
    const distanceA = Math.sqrt(
      Math.pow(a.latitude - currentLatitude, 2) + Math.pow(a.longitude - currentLongitude, 2)
    );
    const distanceB = Math.sqrt(
      Math.pow(b.latitude - currentLatitude, 2) + Math.pow(b.longitude - currentLongitude, 2)
    );

    return distanceA - distanceB;

  });
  return staticMarkers.slice(0,limit);
}
const MapComponent = () => {
  const [userData, setUserData] = useState([]);
  const [mail, setMail] = useState([]);
  const [map, setMap] = useState(null); // State to store the map instance
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  const sendEmailsToServer = async (emailData, latitude, longitude) => {
    try {
      const Nearestlocation = getNearestMarkers(latitude, longitude, 5, userData);
      const agencyEmails = emailData.filter(e => Nearestlocation.find(l => l.name === e.name));
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailData: agencyEmails, latitude, longitude }),
      });

      if (response.ok) {
        console.log('Emails sent to the server successfully');
      } else {
        console.error('Failed to send emails to the server');
      }
    } catch (error) {
      console.error('Error sending emails to the server:', error);
    }
  };

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
        setMail(updatedmailData);
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
              findNearestMarkers(latitude, longitude, 5);
              console.log(mail, userData);
              sendEmailsToServer(mail, latitude, longitude);

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

    const findNearestMarkers = (currentLatitude, currentLongitude, limit) => {
      const staticMarkers = getNearestMarkers(currentLatitude, currentLongitude, limit, userData);

      staticMarkers.forEach((marker, index) => {
        const markerColor = index < 5 ? 'blue' : 'red';

        const customIcon = L.divIcon({
          className: `dynamic-marker ${markerColor}`,
          html: `<div class="marker"></div>`,
        });

        L.marker([marker.latitude, marker.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<strong>${marker.name}</strong><br/>Latitude: ${marker.latitude}<br/>Longitude: ${marker.longitude}`
          )
          .openPopup();
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

    <div>
            <button id="showMarkersButton">SOS</button>
      {/* <button className="open-chatbot-button" onClick={toggleChatbot}>
        Chatbot
      </button>
      {isChatbotOpen && <Chatbot />} */}
      <div id="map"></div>
    
    </div>
  );
};

export default MapComponent;
