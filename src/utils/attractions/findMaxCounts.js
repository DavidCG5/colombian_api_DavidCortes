export function findMaxCounts(groupedAttractions) {
  let maxDepartment = { name: "", count: 0 };
  let maxCity = { name: "", count: 0 };

  Object.values(groupedAttractions).forEach((department) => {
    Object.entries(department.cityGroups).forEach(([cityId, cityGroup]) => {
      if (cityGroup.count > maxCity.count) {
        maxCity = { name: cityGroup.city, count: cityGroup.count };
      }
    });

    const totalDepartmentCount = Object.values(department.cityGroups).reduce(
      (sum, cityGroup) => sum + cityGroup.count,
      0
    );

    if (totalDepartmentCount > maxDepartment.count) {
      maxDepartment = {
        name: department.department,
        count: totalDepartmentCount,
      };
    }
  });

  return {
    maxDepartment,
    maxCity,
    totalAttractions: Object.values(groupedAttractions).flatMap((department) =>
      Object.values(department.cityGroups).flatMap(
        (cityGroup) => cityGroup.attractions
      )
    ).length,
  };
}
