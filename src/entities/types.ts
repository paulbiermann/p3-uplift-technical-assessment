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
    capital: Array<String>,
    population: number,
    region: string
}