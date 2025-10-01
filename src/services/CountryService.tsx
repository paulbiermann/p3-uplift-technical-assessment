import { Country } from "../entities/types";

/**
 * Gets a list of countries from restcountries.com
 * 
 * @returns {Promise<Country[]>}
 */
async function getCountries(): Promise<Array<Country>> {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");
    if (!res.ok) throw new Error("Failed to fetch countries");
    return await res.json();
}

export {
    getCountries
}