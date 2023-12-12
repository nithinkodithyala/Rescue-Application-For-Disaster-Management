
import React, { useState, useEffect } from 'react';
// import chatboot from './chat.css';  

const disasterChat = {
    "disasters": [
      {
        "name": "Earthquake",
        "information": "An earthquake is the shaking of the surface of the Earth resulting from a sudden release of energy in the Earth's lithosphere that creates seismic waves.",
        "precautions": [
          "Drop, Cover, and Hold On during shaking.",
          "Move away from windows and heavy furniture.",
          "Have an emergency kit with essential supplies."
        ]
      },
      
      {
        "name": "Help",
        "information": "Click the SOS button the Rescue team will save you ",
        "precautions": [ "Stay safe in yr home"],
        
      },
      {
        "name": "hi",
        "information": "Hello Press the SOS Button in case of Emergency",
        "precautions": ["stay Safe in your home"],
      },
      
      {
        "name": "Wildfire",
        "information": "A wildfire is an uncontrolled fire in an area of combustible vegetation.",
        "precautions": [
          "Create a defensible space around your home.",
          "Evacuate early if instructed to do so.",
          "Have a 'go bag' with important documents and supplies."
        ]
      },
      {
        "name": "Flood",
        "information": "A flood is the overflow of water onto normally dry land.",
        "precautions": [
          "Move to higher ground if in a flood-prone area.",
          "Do not walk or drive through floodwaters.",
          "Have an emergency flood kit with necessary supplies."
        ]
      },
      {
        "name": "Drought",
        "information": "A drought is a prolonged period of abnormally low rainfall, leading to a shortage of water.",
        "precautions": [
          "Conserve water by fixing leaks and using water-efficient appliances.",
          "Plan for water scarcity by storing water and having alternative sources.",
          "Follow local water use restrictions and guidelines."
        ]
      },
      {
        "name": "Cyclone",
        "information": "A cyclone is a large-scale, atmospheric circulation system characterized by low-pressure centers and strong winds.",
        "precautions": [
          "Stay informed about cyclone warnings and evacuation orders.",
          "Secure outdoor objects and reinforce windows.",
          "Have an emergency kit with essential items."
        ]
      }
    ]
  };

  function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    useEffect(() => {
      // Initial message from the bot
      const initialBotMessage = "Hello! I'm here to help you with information about disasters. Feel free to ask for assistance or information.";
      setMessages([initialBotMessage]);
    }, []);
  
    function displayInfo(disaster) {
      const infoMessages = [];
      infoMessages.push(`${disaster.name}: ${disaster.information}`);
      if (disaster.information.length > 0) {
        infoMessages.push('Safety precautions:');
        disaster.precautions.forEach((p) => infoMessages.push(`- ${p}`));
      }
      setMessages((prev) => [...prev, ...infoMessages]);
      setInputValue(''); // Clear the input value after displaying information
    }
  
    function simulateBotResponse() {
      const botResponse = "Is there anything else you'd like to know or ask about?";
      setMessages((prev) => [...prev, botResponse]);
    }
  
    function handleSend() {
      if (inputValue.trim() !== '') {
        // Display user's message
        setMessages((prev) => [...prev, `You: ${inputValue}`]);
        // Find the matched disaster
        const matchedDisaster = disasterChat.disasters.find(
          (disaster) => inputValue.toLowerCase() === disaster.name.toLowerCase()
        );
        // Display bot's response
        if (matchedDisaster) {
          displayInfo(matchedDisaster);
          // Simulate bot response after a short delay
          setTimeout(() => simulateBotResponse(), 1000);
        } else {
          // If no matching disaster is found, just simulate bot response
          simulateBotResponse();
        }
        setInputValue(''); // Clear the input value after sending the message
      }
    }
    
    return (
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message related to disasters"
          />
          <button className="chatbot-send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    );
  }
  
  export default Chatbot;