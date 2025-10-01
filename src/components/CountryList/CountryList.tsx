import React from "react";
import CountryCard from "../CountryCard/CountryCard";
import { Country } from "../../entities/types";
import { getCountries } from "../../services/CountryService";
import styles from "./CountryList.module.css"

const CountryList: React.FC = () => {
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchCountries = async() => {
            setLoading(true);
            setError(false);

            try {
                const countries = await getCountries();
                setCountries(countries);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCountries();
    }, [])

    return <div className={styles['country-list-container']}>
        <h2>Countries</h2>
        {loading && <div className={styles['loading-spinner']}>Loading...</div>}
        {error && <div className={styles['error-message']}>There was an error loading country information. Try refreshing the page.</div>}
        {countries.map(country => <CountryCard country={country} key={country.name.common} />)}
    </div>
}

export default CountryList;