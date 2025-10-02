export interface Flag {
    png: string,
    svg: string,
    alt: string
}

export interface Name {
    common: string,
    official: string,
    nativeName: {
        [languageCode: string]: {
            official: string,
            common: string
        }
    }
}

export interface Country {
    name: Name,
    flags: Flag,
    capital: Array<string>,
    population: number,
    region: string,
    cca3: string
}

export interface CountryFullDetails {
    name: Name,
    tld: Array<string>,
    cca2: string,
    ccn3: string,
    cioc: string,
    independent: boolean,
    status: string,
    unMember: boolean,
    currencies: {
        [currency: string]: {
            symbol: string,
            name: string
        }
    },
    idd: {
        root: string,
        suffixes: Array<string>
    },
    capital: Array<string>
    altSpellings: Array<string>
    region: string,
    subregion: string,
    languages: {
        [languageCode: string]: string
    },
    latlng: Array<Number>,
    landlocked: boolean,
    borders: Array<string>,
    area: number,
    demonyms: {
        [languageCode: string]: {
            f: string
            m: string
        }
    },
    cca3: string,
    flag: string,
    maps: {
        googleMaps: string,
        openStreetMaps: string
    },
    population: number,
    gini: {
        [year: string]: number
    },
    fifa: string,
    car: {
        signs: Array<string>
        side: string
    },
    timezones: Array<string>,
    continents: Array<string>,
    flags: Flag,
    coatOfArms: {
        png: string,
        svg: string,
    },
    startOfWeek: string,
    capitalInfo: {
        latlng: Array<number>
    },
    postalCode: {
        format: string,
        regex: string
    }
}