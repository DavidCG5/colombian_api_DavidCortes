import { useEffect, useState } from "react";
import { fetchAirports, fetchRegions } from "../services/apiService";
import Card from "./Cards/Card";
import DataTable from "./Table/DataTable";
import Search from "./Search/Search";
import { groupAirportsByRegion } from "../utils/airports/groupAirportsByRegion";
import { groupAirportsByDepartmentAndCity } from "../utils/airports/groupAirportsByDepartmentAndCity";
import { findMaxCounts } from "../utils/airports/findMaxCounts";

function AirportsTab() {
  const [groupedAirports, setGroupedAirports] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalAirports, setTotalAirports] = useState(0);
  const [maxDepartment, setMaxDepartment] = useState({ name: "", count: 0 });
  const [maxCity, setMaxCity] = useState({ name: "", count: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const loadAirportsAndRegions = async () => {
      try {
        const startTime = performance.now();
        const [airportsData, regionsData] = await Promise.all([
          fetchAirports(),
          fetchRegions(),
        ]);
        const endTime = performance.now();
        setLoadingTime((endTime - startTime).toFixed(2));

        const regionsMap = regionsData.reduce((acc, region) => {
          acc[region.id] = region.name.toLowerCase();
          return acc;
        }, {});

        const groupedByRegion = groupAirportsByRegion(airportsData, regionsMap);
        setGroupedAirports(groupedByRegion);

        const groupedByDepartmentAndCity =
          groupAirportsByDepartmentAndCity(airportsData);

        const total = airportsData.length;
        setTotalAirports(total);

        const { maxDepartment, maxCity } = findMaxCounts(groupedByRegion);
        setMaxDepartment(maxDepartment);
        setMaxCity(maxCity);

        console.log(
          "Agrupados por Región, Departamento, Ciudad y Tipo:",
          JSON.stringify(groupedByRegion, null, 2)
        );
        console.log(
          "Agrupados por departamento y ciudad:",
          JSON.stringify(groupedByDepartmentAndCity, null, 2)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAirportsAndRegions();
  }, []);

  if (loading) return <p>Loading...</p>;

  const tableData = Object.entries(groupedAirports)
    .flatMap(([regionKey, regionData]) =>
      Object.entries(regionData.departamentos || {}).flatMap(
        ([departmentKey, departmentData]) =>
          Object.entries(departmentData.ciudades || {}).flatMap(
            ([cityKey, cityData]) =>
              Object.entries(cityData.tipos || {}).map(([typeKey, count]) => ({
                region: regionKey,
                departamento: departmentKey,
                ciudad: cityKey,
                tipo: typeKey,
                cantidad: count,
              }))
          )
      )
    )
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.region.toLowerCase().includes(query) ||
        item.departamento.toLowerCase().includes(query) ||
        item.ciudad.toLowerCase().includes(query) ||
        item.tipo.toLowerCase().includes(query) ||
        item.cantidad.toString().includes(query)
      );
    });
  console.log(tableData);

  const tableHeaders = ["Región", "Departamento", "Ciudad", "Tipo", "Cantidad"];

  return (
    <div>
      <h2>Aeropuertos agrupados por región, departamento, ciudad y tipo</h2>
      <p>Tiempo de carga: {loadingTime} ms</p>
      <Search onSearch={setSearchQuery} placeholder="Buscar " />
      <div className="cards-container">
        <Card title="Total Aeropuertos" total={totalAirports} />
        <Card
          title="Departamento con más Aeropuertos"
          total={`${maxDepartment.name}: (${maxDepartment.count} aeropuertos)`}
        />
        <Card
          title="Ciudad con más Aeropuertos"
          total={`${maxCity.name} (${maxCity.count} aeropuertos)`}
        />
      </div>
      {tableData.length > 0 ? (
        <DataTable headers={tableHeaders} data={tableData} />
      ) : (
        <p>No se encontraron resultados para la búsqueda.</p>
      )}
    </div>
  );
}

export default AirportsTab;
