import React from "react";
import { Country } from "../../entities/types";

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return (<div>
        <img src={country.flags.svg} alt={country.flags.alt} />
        <h2>{country.name.common}</h2>
        <p>Population: {country.population}</p>
        <p>Capital: {country.capital.join(', ')}</p>
        <p>Region: {country.region}</p>
    </div>);
}

export default CountryCard;