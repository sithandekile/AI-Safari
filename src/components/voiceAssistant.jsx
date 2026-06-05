import React, { useState } from "react";
import ResponseBox from "./responseBox";

function VoiceAssistant() {
  const [response, setResponse] = useState("");

  const handleSpeak = () => {
    setResponse("You want to send money. Who would you like to send it to?");
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      
      <button
        onClick={handleSpeak}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg shadow-md"
      >
        🎤 Tap to Speak
      </button>

      <ResponseBox response={response} />

    </div>
  );
}

export default VoiceAssistant;