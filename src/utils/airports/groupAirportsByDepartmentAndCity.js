export function groupAirportsByDepartmentAndCity(airports) {
  return airports.reduce((departmentsMap, airport) => {
    const departamento = airport.department?.name || "Departamento desconocido";
    const ciudad = airport.city?.name || "Ciudad desconocida";

    if (!departmentsMap[departamento]) {
      departmentsMap[departamento] = { ciudades: {} };
    }

    if (!departmentsMap[departamento].ciudades[ciudad]) {
      departmentsMap[departamento].ciudades[ciudad] = 0;
    }

    departmentsMap[departamento].ciudades[ciudad]++;

    return departmentsMap;
  }, {});
}
