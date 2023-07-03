import { APIPlanetData, ExpectedTableData, Direction } from "./types";

const BASE_URL = 'https://swapi.dev/api/'
const UNKNOWN_VALUE_SUBSTITUTE = '?'

function mapPlanetDataToTableData(planetData: APIPlanetData): ExpectedTableData {
    // multiple operations need to happen here in the mapping:
    //  - Convert all values of 'unknown' to '?' (assumption: except for url)
    //  - Convert all values representing numbers to a formatted string with spaces for thousands
    //  - Calculate the surface water area based on the percentage of the planet covered in water and the diameter of the planet

    let numberOfResidents = typeof planetData.residents === 'string' ? convertUnknownValues(planetData.residents) : planetData.residents.length.toString();
    let surfaceWater = (convertUnknownValues(planetData.surface_water) === UNKNOWN_VALUE_SUBSTITUTE ||  convertUnknownValues(planetData.diameter) === UNKNOWN_VALUE_SUBSTITUTE)
        ? UNKNOWN_VALUE_SUBSTITUTE 
        : calculateSphericalSurfaceAreaCovered(planetData.surface_water, planetData.diameter);
    let tableData: ExpectedTableData = {
        name: convertUnknownValues(planetData.name),
        url: planetData.url,
        climate: convertUnknownValues(planetData.climate),
        numberOfResidents: convertToFormattedNumber(numberOfResidents),
        terrain: convertUnknownValues(planetData.terrain),
        population: convertToFormattedNumber(planetData.population),
        surfaceWater: convertToFormattedNumber(surfaceWater)
    };
    return tableData;
}

/*
    * Convert all values of 'unknown' to '?'
    * Assumption: only strict string values of 'unknown' (case-sensitive) should be converted not ' unknown ' or 'UNKNOWN'
*/
function convertUnknownValues(incomingValue: any): any {
    if (incomingValue === 'unknown') return UNKNOWN_VALUE_SUBSTITUTE;
    else return incomingValue;
}

function convertToFormattedNumber(incomingValue: string | number): string {
    let formattedNumber = convertUnknownValues(incomingValue);
    if (formattedNumber === UNKNOWN_VALUE_SUBSTITUTE) return formattedNumber;

    formattedNumber = Number(formattedNumber);
    // toLocaleString() will add commas for thousands so then we will replace commas with spaces for the desired format
    formattedNumber = formattedNumber.toLocaleString('en-US').split(',').join(' ');
    return formattedNumber;

}


/*
    * Calculate the surface area covered (in a given unit of area e.g. km2) based on the percentage of the surface area covered and the diameter of the planet
*/
function calculateSphericalSurfaceAreaCovered(percentCovered: number | string, diameter: number | string): number {
    percentCovered = Number(percentCovered);
    diameter = Number(diameter);
    let radius = diameter / 2;
    var surfaceAreaOfSphere = 4 * Math.PI * Math.pow(radius, 2); // find the surface area of the sphere
    var surfaceAreaCovered = (percentCovered / 100) * surfaceAreaOfSphere; // find the area covered (in whichever unit was used for diameter)
    return Math.round(surfaceAreaCovered); // round to nearest whole number
  }
  

function sortObjArrayByKey(objArray: any[], key: string, direction: Direction) {
    return objArray.sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? -1 : 1;
      } else {
        return a[key] > b[key] ? 1 : -1;
      }
    })
}

function shouldWrapWithLink(columnKey: string, row: any): boolean {
    if (columnKey !== 'name') return false;
    if (!row || !row['url']) return false;
    return row['url'].startsWith(BASE_URL);
  }

export {
    BASE_URL,
    mapPlanetDataToTableData,
    sortObjArrayByKey,
    shouldWrapWithLink,
    convertUnknownValues,
    convertToFormattedNumber,
    calculateSphericalSurfaceAreaCovered,
}