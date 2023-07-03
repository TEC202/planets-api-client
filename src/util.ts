import { APIPlanetData, ExpectedTableData, Direction } from "./types";


function mapPlanetDataToTableData(planetData: APIPlanetData): ExpectedTableData {
    // WIP for table setup -- needs formatting, calculations, etc
    let tableData: ExpectedTableData = {
        name: planetData.name,
        url: planetData.url,
        climate: planetData.climate,
        numberOfResidents: planetData.residents.length.toString(),
        terrain: planetData.terrain,
        population: planetData.population,
        surfaceWater: planetData.surface_water // TODO: calculate surface water area
    }
    return tableData
}

function sortObjArrayByKey(objArray: any[], key: string, direction: Direction) {
    return objArray.sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1
      } else {
        return a[key] < b[key] ? 1 : -1
      }
    })
}

export {
    mapPlanetDataToTableData,
    sortObjArrayByKey,
}