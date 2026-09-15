import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>LOOPA</h1>
      <p>Handmade. Beautifully yours.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
