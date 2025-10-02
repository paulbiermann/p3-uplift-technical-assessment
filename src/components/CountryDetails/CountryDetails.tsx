import React from "react";
import { useParams } from "react-router";
import { CountryFullDetails } from "../../entities/types";
import { getCountryByCCA3 } from "../../services/CountryService";
import styles from "./CountryDetails.module.css";

/**
 * 
    Display detailed info such as native name, subregion, timezones, currencies, languages, and borders.
    Implement a back button to return to the country list.

 * @returns 
 */

const CountryDetails: React.FC = () => {
    const params = useParams();

    const [country, setCountry] = React.useState<CountryFullDetails | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchCountries = async() => {
            setLoading(true);
            setError(false);

            if (!params.cca3) {
                setError(true);
                setLoading(false);
                return;
            }

            try {
                const country = await getCountryByCCA3(params.cca3);
                setCountry(country);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCountries();
    }, []);


    return <div className={styles['country-modules-container']}>
        {loading && <div className={styles['loading-spinner']}>Loading...</div>}
        {error && <div className={styles['error-message']}>There was an error loading country information. Try refreshing the page.</div>}
        {!!country && <>
            <h1>{country?.name?.official}</h1>
            <div>
                <p>Common name: {country?.name?.common}</p>
                <p>Top Level Domain: {country?.tld?.join(', ')}</p>
            </div>
        </>}
    </div>;
}

export default CountryDetails;