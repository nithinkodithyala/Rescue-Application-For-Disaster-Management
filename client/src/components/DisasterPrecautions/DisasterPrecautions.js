import React, { useState } from 'react';
import './DisasterPrecautions.css'; // You may create this file for styling

const DisasterPrecautions = () => {
  const [selectedDisaster, setSelectedDisaster] = useState("cyclone");

  const handleButtonClick = (disasterType) => {
    setSelectedDisaster(selectedDisaster === disasterType ? null : disasterType);
  };

  const disasterPrecautions = {
    cyclone: {
      do: [
        'Stay informed about weather conditions.',
        'Prepare an emergency kit with essentials.',
        'Follow evacuation orders if issued.',
        'Secure outdoor objects and furniture.',
        'Stay indoors during the storm.',
      ],
      dont: [
        'Ignore evacuation warnings.',
        'Stay near windows during the storm.',
        'Drive or walk through flooded areas.',
        'Use candles for lighting during power outages.',
      ],
    },
    earthquake: {
      do: [
        'Drop, Cover, and Hold On during shaking.',
        'Stay indoors away from windows.',
        'Have an emergency supply kit.',
        'Identify safe spots in each room.',
      ],
      dont: [
        'Run outside during shaking.',
        'Stand in doorways during shaking.',
        'Use elevators during an earthquake.',
        'Ignore aftershocks.',
      ],
    },
    flood: {
      do: [
        'Evacuate to higher ground if instructed.',
        'Avoid walking or driving through flooded areas.',
        'Have a family emergency plan.',
        'Monitor weather updates and warnings.',
      ],
      dont: [
        'Drive through flooded roads.',
        'Stay in a flooded building.',
        'Underestimate the power of moving water.',
        'Ignore evacuation orders.',
      ],
    },
    // Add more disaster types and their precautions as needed
    wildfire: {
      do: [
        'Create a defensible space around your home.',
        'Keep roofs and gutters clear of debris.',
        'Have an emergency evacuation plan.',
        'Stay informed about fire conditions.',
      ],
      dont: [
        'Ignore evacuation orders.',
        'Leave windows or doors open during a wildfire.',
        'Use flammable materials near your home.',
        'Delay evacuation until the last minute.',
      ],
    },
    tornado: {
      do: [
        'Seek shelter in a basement or storm cellar.',
        'If no underground shelter is available, go to an interior room on the lowest floor.',
        'Stay away from windows.',
        'Listen to a weather radio or app for updates.',
      ],
      dont: [
        'Try to outrun a tornado in your vehicle.',
        'Stay in a mobile home during a tornado.',
        'Ignore tornado warnings.',
        'Open windows to equalize pressure.',
      ],
    },
    tsunami: {
      do: [
        'Move to higher ground immediately.',
        'Follow local evacuation routes.',
        'Stay tuned to emergency alerts.',
        'Have a tsunami emergency kit.',
      ],
      dont: [
        'Stay near the coast after a strong earthquake.',
        'Return to the coast too soon after a tsunami warning.',
        'Ignore evacuation orders.',
        'Go to the beach to watch for a tsunami.',
      ],
    },
    hurricane: {
      do: [
        'Prepare a hurricane emergency kit.',
        'Board up windows and secure outdoor objects.',
        'Follow evacuation orders if issued.',
        'Monitor weather updates and warnings.',
      ],
      dont: [
        'Ignore evacuation orders.',
        'Stay in a mobile home during a hurricane.',
        'Leave windows or doors open during the storm.',
        'Drive through flooded roads.',
      ],
    },
  };

  const renderAccordionItem = (disasterType) => {
    const { do: dos, dont: donts } = disasterPrecautions[disasterType];
    const isActive = selectedDisaster === disasterType;

    return (
      <div className={`accordion-item ${isActive ? 'active' : ''}`} key={disasterType}>
        <button className="accordion-button" onClick={() => handleButtonClick(disasterType)}>
          {disasterType.charAt(0).toUpperCase() + disasterType.slice(1)}
        </button>
        {isActive && (
          <div className="panel">
            <ul>
              <li><strong>Do:</strong></li>
              {dos.map((doItem, index) => <li key={index}>{doItem}</li>)}
              <li><strong>Don't:</strong></li>
              {donts.map((dontItem, index) => <li key={index}>{dontItem}</li>)}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="disaster-precautions-container">
      <h1>Disaster Precautions</h1>
      <div className="accordion">
        {Object.keys(disasterPrecautions).map(disasterType =>
          renderAccordionItem(disasterType)
        )}
      </div>
    </div>
  );
};

export default DisasterPrecautions;