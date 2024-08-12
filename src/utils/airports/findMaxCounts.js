function countAirportsInCity(cityData) {
  let cityCount = 0;
  if (cityData.tipos) {
    Object.values(cityData.tipos).forEach((count) => {
      cityCount += count;
    });
  }
  return cityCount;
}

function countAirportsInDepartment(departmentData) {
  let departmentCount = 0;
  Object.values(departmentData.ciudades || {}).forEach((cityData) => {
    departmentCount += countAirportsInCity(cityData);
  });
  return departmentCount;
}

export function findMaxCounts(groupedData) {
  let maxDepartment = { name: "", count: 0 };
  let maxCity = { name: "", count: 0 };

  Object.values(groupedData).forEach((regionData) => {
    Object.entries(regionData.departamentos || {}).forEach(
      ([departmentName, departmentData]) => {
        const departmentCount = countAirportsInDepartment(departmentData);

        if (departmentCount > maxDepartment.count) {
          maxDepartment = { name: departmentName, count: departmentCount };
        }

        Object.entries(departmentData.ciudades || {}).forEach(
          ([cityName, cityData]) => {
            const cityCount = countAirportsInCity(cityData);

            if (cityCount > maxCity.count) {
              maxCity = { name: cityName, count: cityCount };
            }
          }
        );
      }
    );
  });

  return { maxDepartment, maxCity };
}
