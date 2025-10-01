import React from "react";
import { useParams } from "react-router-dom";

const CountryDetails: React.FC = () => {
    const params = useParams();
    return <h2>CountryDetails Place Holder: {params.cca3}</h2>
}

export default CountryDetails;