export function groupAirportsByRegion(airports, regions) {
  return airports.reduce((airportCount, airport) => {
    const regionId = airport.department?.regionId;
    const departamento = airport.department?.name || "Departamento desconocido";
    const ciudad = airport.city?.name || "Ciudad desconocida";
    const tipo = airport.type || "Tipo desconocido";

    const regionNombre = regions[regionId] || "Región desconocida";
    const regionKey = regionNombre.toLowerCase();

    if (!airportCount[regionKey]) {
      airportCount[regionKey] = { departamentos: {} };
    }

    if (!airportCount[regionKey].departamentos[departamento]) {
      airportCount[regionKey].departamentos[departamento] = { ciudades: {} };
    }

    if (!airportCount[regionKey].departamentos[departamento].ciudades[ciudad]) {
      airportCount[regionKey].departamentos[departamento].ciudades[ciudad] = {
        tipos: {},
      };
    }

    if (
      !airportCount[regionKey].departamentos[departamento].ciudades[ciudad]
        .tipos[tipo]
    ) {
      airportCount[regionKey].departamentos[departamento].ciudades[
        ciudad
      ].tipos[tipo] = 0;
    }

    airportCount[regionKey].departamentos[departamento].ciudades[ciudad].tipos[
      tipo
    ]++;

    return airportCount;
  }, {});
}
