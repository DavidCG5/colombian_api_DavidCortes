import { useEffect, useState } from "react";
import { fetchPresidents } from "../services/apiService";
import { groupByParty } from "../utils/presidents/groupByParty";
import Card from "./Cards/Card";
import DataTable from "./Table/DataTable";
import Search from "./Search/Search";
import LoadingTime from "./LoadingTime";

function Presidents() {
  const [groupedPresidents, setGroupedPresidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPresident, setCurrentPresident] = useState(null);
  const [totalPresidents, setTotalPresidents] = useState(0);
  const [topParty, setTopParty] = useState({ party: "", count: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const loadPresidents = async () => {
      try {
        const startTime = performance.now();
        const data = await fetchPresidents();
        const endTime = performance.now();
        setLoadingTime((endTime - startTime).toFixed(2));
        const grouped = groupByParty(data);

        const current = data.find(
          (president) => president.endPeriodDate === null
        );

        const total = data.length;
        setTotalPresidents(total);

        const formattedData = Object.keys(grouped)
          .map((party) => ({
            party,
            count: grouped[party],
          }))
          .sort((a, b) => b.count - a.count);

        setGroupedPresidents(formattedData);
        setCurrentPresident(current);
        setLoading(false);

        const topPartyData = formattedData[0] || { party: "", count: 0 };
        setTopParty(topPartyData);

        console.log(
          "Grouped Presidents JSON:",
          JSON.stringify(formattedData, null, 2)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadPresidents();
  }, []);

  const filteredPresidents = groupedPresidents.filter((president) =>
    president.party.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Presidentes por partido político</h2>
      <LoadingTime time={loadingTime} />
      <Search onSearch={setSearchQuery} placeholder="Buscar por partido" />
      <div className="cards-container">
        <Card
          title="Total Presidentes"
          total={totalPresidents}
          totalText="Total:"
        />
        <Card
          title="Presidente Actual"
          icon={currentPresident?.image}
          total={
            currentPresident
              ? currentPresident.name + " " + currentPresident.lastName
              : "No hay presidente actual"
          }
        />
        <Card
          title="Partido con más Presidentes Electos"
          total={`${topParty.party} (${topParty.count} presidentes)`}
        />
      </div>

      <DataTable
        headers={["Partido político", "Número de presidentes electos"]}
        data={filteredPresidents}
      />
    </div>
  );
}

export default Presidents;
