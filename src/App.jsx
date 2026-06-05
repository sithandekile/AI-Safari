import React from "react";
import VoiceAssistant from "./components/VoiceAssistant";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Voice Assistant for Financial Access
      </h1>

      <VoiceAssistant />

    </div>
  );
}

export default App;