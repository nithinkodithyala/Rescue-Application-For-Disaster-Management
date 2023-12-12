import React, { useState } from 'react';
import './DisasterPrecautions.css'; // You may create this file for styling

const DisasterPrecautions = () => {
  const [selectedDisaster, setSelectedDisaster] = useState("cyclone");

  const handleButtonClick = (disasterType) => {
    setSelectedDisaster(disasterType);
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

  const renderPrecautions = () => {
    if (!selectedDisaster) {
      return null; // Don't render anything if no disaster is selected
    }

    const { do: dos, dont: donts } = disasterPrecautions[selectedDisaster];

    return (<div>
        <div className={`precautions ${selectedDisaster ? 'active' : ''}`}>
        <h2>{`${selectedDisaster.charAt(0).toUpperCase()}${selectedDisaster.slice(1)}Precautions`}</h2>
        <p>Do:</p>
        <ul>
          {dos.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
        <p>Don't:</p>
        <ul>
          {donts.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    </div>
      
    );
  };

  return (
    <div>
      <h1>Disaster Precautions</h1>

      <button onClick={() => handleButtonClick('cyclone')}>Cyclone</button>
      <button onClick={() => handleButtonClick('earthquake')}>Earthquake</button>
      <button onClick={() => handleButtonClick('flood')}>Flood</button>
      <button onClick={() => handleButtonClick('wildfire')}>Wildfire</button>
      <button onClick={() => handleButtonClick('tornado')}>Tornado</button>
      <button onClick={() => handleButtonClick('tsunami')}>Tsunami</button>
      <button onClick={() => handleButtonClick('hurricane')}>Hurricane</button>

      {/* Render precautions for the selected disaster */}
      {renderPrecautions()}
    </div>
  );
};

export default DisasterPrecautions;