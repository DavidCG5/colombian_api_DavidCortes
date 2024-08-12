export function groupByDepartmentAndCity(attractions, departmentNames) {
  return attractions.reduce((acc, attraction) => {
    const { city, cityId } = attraction;
    const { departmentId, name: departmentName } = city;

    if (!acc[departmentId]) {
      acc[departmentId] = {
        department: departmentNames[departmentId] || departmentName,
        cityGroups: {},
      };
    }

    if (!acc[departmentId].cityGroups[cityId]) {
      acc[departmentId].cityGroups[cityId] = {
        city: city.name,
        count: 0,
        attractions: [],
      };
    }

    acc[departmentId].cityGroups[cityId].count += 1;
    acc[departmentId].cityGroups[cityId].attractions.push(attraction);

    return acc;
  }, {});
}
