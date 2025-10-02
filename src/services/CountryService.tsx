import { Country, CountryFullDetails } from "../entities/types";

/**
 * Gets a list of countries from restcountries.com
 * 
 * @returns {Promise<Country[]>}
 */
async function getCountries(): Promise<Array<Country>> {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3");
    if (!res.ok) throw new Error("Failed to fetch countries");
    return await res.json();
}

async function getCountryByCCA3(cca3: string): Promise<CountryFullDetails> {
    const res = await fetch("https://restcountries.com/v3.1/alpha/" + cca3);
    if (!res.ok) throw new Error("Failed to fetch countries");
    const responseBody = await res.json();
    return responseBody[0];
}

export {
    getCountries,
    getCountryByCCA3
}