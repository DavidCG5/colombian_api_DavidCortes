export function extractRelevantData(groupedAttractions) {
  return Object.keys(groupedAttractions).flatMap((departmentId) => {
    const department = groupedAttractions[departmentId];
    return Object.keys(department.cityGroups).flatMap((cityId) => {
      const cityGroup = department.cityGroups[cityId];
      return cityGroup.attractions.map((attraction) => ({
        department: department.department,
        city: cityGroup.city,
        attractionName: attraction.name,
        count: cityGroup.count,
      }));
    });
  });
}
