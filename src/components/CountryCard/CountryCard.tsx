import React from "react";
import { Country } from "../../entities/types";

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return <h1>CountryCard Placeholder: {country.name.common}</h1>
}

export default CountryCard;