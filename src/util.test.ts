import { convertUnknownValues, sortObjArrayByKey, convertToFormattedNumber, calculateSphericalSurfaceAreaCovered, mapPlanetDataToTableData } from './util';

it('convertUnknownValues should convert all values of "unknown" to "?"', () => {
    expect(convertUnknownValues('unknown')).toBe('?');
    expect(convertUnknownValues('unknown ')).not.toBe('?');
    expect(convertUnknownValues(null)).toBe(null);
    expect(convertUnknownValues(123)).toBe(123);
});

it('sortObjArrayByKey should sort an array of objects by a given key and direction', () => {
    let objArray = [
        { name: 'Mercury', diameter: 4879 },
        { name: 'Venus', diameter: 12104 },
        { name: 'Earth', diameter: 12756 },
        { name: 'Mars', diameter: 6792 }
    ]
    let sortedAscObjArray = [
        { name: 'Venus', diameter: 12104 },
        { name: 'Mercury', diameter: 4879 },
        { name: 'Mars', diameter: 6792 },
        { name: 'Earth', diameter: 12756 }
    ]
    let sortedDescObjArray = [
        { name: 'Earth', diameter: 12756 },
        { name: 'Mars', diameter: 6792 },
        { name: 'Mercury', diameter: 4879 },
        { name: 'Venus', diameter: 12104 }
    ]
    expect(sortObjArrayByKey(objArray, 'name', 'asc')).toEqual(sortedAscObjArray);
    expect(sortObjArrayByKey(objArray, 'name', 'desc')).toEqual(sortedDescObjArray);
});


it('convertToFormattedNumber should convert a number to a string with spaces for thousands', () => {
    expect(convertToFormattedNumber(123456789)).toBe('123 456 789');
    expect(convertToFormattedNumber(123456789.123)).toBe('123 456 789.123');
    expect(convertToFormattedNumber('unknown')).toBe('?');
    expect(convertToFormattedNumber('unknown ')).not.toBe('?');
    expect(convertToFormattedNumber(123)).toBe('123');
});

it('calculateSphericalSurfaceAreaCovered should calculate the surface area covered (in a given unit of area e.g. km2) based on the percentage of the surface area covered and the diameter of the planet', () => {
    let percentCovered = 50;
    let diameter = 12756;
    let surfaceAreaCovered = 255592966;
    expect(calculateSphericalSurfaceAreaCovered(percentCovered, diameter)).toBe(Math.round(surfaceAreaCovered));
    expect(calculateSphericalSurfaceAreaCovered('unknown', diameter)).toBe(NaN);
    expect(calculateSphericalSurfaceAreaCovered(percentCovered, 'unknown')).toBe(NaN);
});

//.... finish writing unit tests for util.ts