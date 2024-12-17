import React from "react";
import Calculator from "./components/Calculator";

const App = () => {
  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4 text-center">Scientific Calculator</h1>
      <Calculator />
      <p className="developer">
        Developed by 🧑‍💻 <span>Akram Hasan</span>
      </p>
    </div>
  );
};

export default App;
