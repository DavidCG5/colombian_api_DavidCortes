import { useState, useEffect } from "react";
import Presidents from "./Presidents";
import AirportsTab from "./Airports";
import AttractionsTab from "./Attractions";
import "../styles/tab.css";

function Tabs() {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab ? parseInt(savedTab, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const seleccionar = (index) => {
    setActiveTab(index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Presidents />;
      case 1:
        return <AirportsTab />;
      case 2:
        return <AttractionsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="tab-container">
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => seleccionar(0)}
        >
          Presidentes
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => seleccionar(1)}
        >
          Aeropuertos
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => seleccionar(2)}
        >
          Atracciones
        </li>
        <span
          className="indicator"
          style={{
            transform: `translateX(${activeTab * 150}px)`,
          }}
        ></span>
      </ul>

      <div className="tab-content" style={{ color: "white" }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default Tabs;
