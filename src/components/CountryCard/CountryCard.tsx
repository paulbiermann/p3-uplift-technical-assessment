import React from "react";
import { Country } from "../../entities/types";

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return (<div>
        <img src={country.flags.svg} alt={country.flags.alt} />
        <h2>{country.name.common}</h2>
    </div>);
}

export default CountryCard;