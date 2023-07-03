export type ExpectedAPIResponse = {
    count: number,
    next: string,
    previous: string,
    results: APIPlanetData[]
};

export type APIPlanetData = {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    created: string,
    edited: string,
    url: string
};


/*
    * The data that will be displayed in the table
    * Note: string types used for numbers for formatting purposes
*/
export type ExpectedTableData = {
    name: string,
    url: string,
    climate: string,
    numberOfResidents: string,
    terrain: string,
    population: string,
    surfaceWater: string
};

export type Column = {
    label: string,
    key: keyof ExpectedTableData,
};

export type Direction = 'asc' | 'desc';