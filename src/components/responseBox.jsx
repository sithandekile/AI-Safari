import React from "react";

function ResponseBox({ response }) {
  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl w-87.5 shadow-lg">
      
      <h3 className="text-lg font-semibold mb-3">
        AI Response
      </h3>

      <p className="bg-slate-700 p-3 rounded-lg">
        {response || "Your response will appear here..."}
      </p>

    </div>
  );
}

export default ResponseBox;