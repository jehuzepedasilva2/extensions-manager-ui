import configs from "./constants.js";

export async function fetchJSON() {
  // if its cached just return it, no need to fetch again
  if (configs.cachedData) {
    return configs.cachedData;
  }

  const response = await fetch("../data.json");
  const data = await response.json();
  configs.cachedData = data;
  return data;
}

export function changeDataStatus(id, newStatus) {
  configs.cachedData.forEach((ext) => {
    if (ext.id === id) {
      ext.isActive = newStatus;
    }
  });
}

export function deleteData(id) {
  const newData = configs.cachedData.filter((ext) => {
    return ext.id !== id;
  });
  configs.cachedData = newData;
}
