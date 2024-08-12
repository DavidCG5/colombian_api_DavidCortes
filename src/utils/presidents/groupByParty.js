// Función para agrupar y contar presidentes por partido
export function groupByParty(presidents) {
  return presidents.reduce((partyCount, president) => {
    const { politicalParty } = president;

    if (!partyCount[politicalParty]) {
      partyCount[politicalParty] = 0;
    }

    partyCount[politicalParty]++;

    return partyCount;
  }, {});
}
