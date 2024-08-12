import Tabs from "./components/Tabs";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/colombia_dash" />} />
          <Route path="/colombia_dash" element={<Tabs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
