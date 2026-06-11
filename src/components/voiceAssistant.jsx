import { useState } from "react";

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [step, setStep] = useState("idle");
  const [recipient, setRecipient] = useState("");
  const [showFallback, setShowFallback] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const isVoiceSupported = !!SpeechRecognition;

  // 🔊 TEXT → VOICE
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.cancel(); // stop overlapping speech
    window.speechSynthesis.speak(speech);
  };

  //  START LISTENING
  const startListening = () => {
    if (!isVoiceSupported) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    let hasSpoken = false;

    const timeout = setTimeout(() => {
      if (!hasSpoken) {
        setListening(false);
        speak("I couldn't hear you. Please use the buttons.");
        setShowFallback(true);
      }
    }, 4000);

    recognition.onresult = (event) => {
      hasSpoken = true;
      clearTimeout(timeout);

      const text = event.results[0][0].transcript.toLowerCase();
      handleCommand(text);

      setListening(false);
    };

    recognition.onerror = () => {
      clearTimeout(timeout);
      setListening(false);
      setShowFallback(true);
    };

    recognition.onend = () => {
      clearTimeout(timeout);
      setListening(false);
    };
  };

  // 🧠 CONVERSATION LOGIC
  const handleCommand = (input) => {
    console.log("User said:", input);

    // IDLE STATE
    if (step === "idle") {
      if (input.includes("send")) {
        setStep("askRecipient");
        speak("Who would you like to send money to?");
      } 
      else if (input.includes("balance")) {
        speak("Your balance is 200 dollars.");
      } 
      else if (input.includes("loan")) {
        setStep("loanAmount");
        speak("How much loan do you need?");
      } 
      else {
        speak("Sorry, I didn't understand.");
      }
    }

    // SEND MONEY FLOW
    else if (step === "askRecipient") {
      setRecipient(input);
      setStep("confirmSend");
      speak(`You want to send money to ${input}. Should I proceed?`);
    }

    else if (step === "confirmSend") {
      if (input.includes("yes")) {
        speak(`Money sent to ${recipient}.`);
      } else {
        speak("Transaction cancelled.");
      }
      setStep("idle");
    }

    // LOAN FLOW
    else if (step === "loanAmount") {
      setRecipient(input);
      setStep("confirmLoan");
      speak(`You want a loan of ${input}. Should I apply?`);
    }

    else if (step === "confirmLoan") {
      if (input.includes("yes")) {
        speak(`Your loan request for ${recipient} has been submitted.`);
      } else {
        speak("Loan request cancelled.");
      }
      setStep("idle");
    }
  };

  // 🧩 FALLBACK BUTTON ACTION
  const simulate = (command) => {
    handleCommand(command);
  };

  return (
    <div className="flex flex-col items-center space-y-6">

      <h1 className="text-2xl font-semibold">Voice Assistant</h1>

      {/* 🎤 VOICE BUTTON */}
      {isVoiceSupported && (
        <button
          onClick={startListening}
          className={`w-24 h-24 rounded-full text-3xl shadow-lg transition 
          ${listening ? "bg-red-500 animate-pulse" : "bg-green-500 hover:scale-105"}`}
        >
          🎤
        </button>
      )}

      {/* ⚠️ FALLBACK UI */}
      {(showFallback || !isVoiceSupported) && (
        <div className="flex flex-col items-center space-y-4">

          <p className="text-gray-300 text-center">
            Voice not working? Use buttons below.
          </p>

          {/* <button
            onClick={() => simulate("send money")}
            className="bg-green-500 px-6 py-2 rounded hover:scale-105 transition"
          >
            Send Money
          </button>

          <button
            onClick={() => simulate("check balance")}
            className="bg-blue-500 px-6 py-2 rounded hover:scale-105 transition"
          >
            Check Balance
          </button> */}

          <button
            onClick={() => simulate("loan")}
            className="bg-yellow-500 px-6 py-2 rounded hover:scale-105 transition"
          >
            Apply Loan
          </button>

          <button
            onClick={() => simulate("yes")}
            className="bg-purple-500 px-6 py-2 rounded hover:scale-105 transition"
          >
            Yes
          </button>

          <button
            onClick={() => simulate("no")}
            className="bg-gray-500 px-6 py-2 rounded hover:scale-105 transition"
          >
            No
          </button>

        </div>
      )}
    </div>
  );
}