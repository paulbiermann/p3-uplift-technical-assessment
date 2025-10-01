import React from "react";
import { Country } from "../../entities/types";
import styles from './CountryCard.module.css'
import { Link } from "react-router-dom";

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return <div className={styles['country-card']}>
        <img src={country.flags.svg} alt={country.flags.alt} className={styles['country-card-img']} />
        <div className={styles['country-card-contents']}>
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>
            <p>Capital: {country.capital.join(', ')}</p>
            <p>Region: {country.region}</p>
        </div>
        <Link to={'/countries/' + country.cca3}>
            <button className={styles['country-card-button']}>See more</button>
        </Link>
        
    </div>;
}

export default CountryCard;