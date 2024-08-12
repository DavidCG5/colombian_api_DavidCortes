import { useEffect, useState } from "react";
import { fetchAttractions, fetchDepartments } from "../services/apiService";
import { groupByDepartmentAndCity } from "../utils/attractions/groupByDepartmentAndCity";
import { extractRelevantData } from "../utils/attractions/extractRelevantData";
import { findMaxCounts } from "../utils/attractions/findMaxCounts";
import DataTable from "./Table/DataTable";
import Card from "./Cards/Card";
import Search from "./Search/Search";
import LoadingTime from "./LoadingTime";

function AttractionsTab() {
  const [groupedAttractions, setGroupedAttractions] = useState({});
  const [loading, setLoading] = useState(true);
  const [maxDepartment, setMaxDepartment] = useState({ name: "", count: 0 });
  const [maxCity, setMaxCity] = useState({ name: "", count: 0 });
  const [totalAttractions, setTotalAttractions] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const startTime = performance.now();
        const attractions = await fetchAttractions();
        const departments = await fetchDepartments();
        const endTime = performance.now();
        setLoadingTime((endTime - startTime).toFixed(2));
        const departmentNamesMap = departments.reduce((map, department) => {
          map[department.id] = department.name;
          return map;
        }, {});

        const grouped = groupByDepartmentAndCity(
          attractions,
          departmentNamesMap
        );
        setGroupedAttractions(grouped);

        const filteredData = extractRelevantData(grouped);
        const { maxDepartment, maxCity, totalAttractions } =
          findMaxCounts(grouped);
        setMaxDepartment(maxDepartment);
        setMaxCity(maxCity);
        setTotalAttractions(totalAttractions);

        console.log(
          "Filtered Attractions JSON:",
          JSON.stringify(filteredData, null, 2)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  const filteredData = extractRelevantData(groupedAttractions).filter(
    (item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.department.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.attractionName.toLowerCase().includes(query) ||
        item.count.toString().includes(query)
      );
    }
  );
  const tableHeaders = [
    "Departamento",
    "Ciudad",
    "Atractivo Turístico",
    "Cantidad",
  ];

  return (
    <div>
      <h2>Atractivos Turísticos por Departamento y Ciudad</h2>
      <LoadingTime time={loadingTime} />
      <Search onSearch={setSearchQuery} placeholder="Buscar por atracción" />
      <div className="cards-container">
        <Card
          title="Departamento con más atracciones"
          total={`${maxDepartment.name}: ${maxDepartment.count}`}
        />
        <Card
          title="Ciudad con más atracciones"
          total={`${maxCity.name}: ${maxCity.count}`}
        />
        <Card title="Total de atracciones" total={`${totalAttractions}`} />
      </div>
      <DataTable headers={tableHeaders} data={filteredData} />
    </div>
  );
}

export default AttractionsTab;
