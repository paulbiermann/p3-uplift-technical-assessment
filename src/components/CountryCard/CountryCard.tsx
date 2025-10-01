import React from "react";
import { Country } from "../../entities/types";

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return (<div>
        <img src={country.flags.svg} alt={country.flags.alt} />
        <h2>{country.name.common}</h2>
        <p>population: {country.population}</p>
        <p>capital: {country.capital.join(', ')}</p>
        <p>region: {country.region}</p>
    </div>);
}

export default CountryCard;