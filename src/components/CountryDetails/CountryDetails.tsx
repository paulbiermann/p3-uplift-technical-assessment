import React from "react";
import { useParams, Link } from "react-router";
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
        <Link to={'/'}>
            <button>back</button>
        </Link>
        {loading && <div className={styles['loading-spinner']}>Loading...</div>}
        {error && <div className={styles['error-message']}>There was an error loading country information. Try refreshing the page.</div>}
        {!!country && <>
            <h1>{country?.name?.official}</h1>
            <div>
                <p>Common name: {country?.name?.common}</p>
                <p>Alternative Spellings: {country.altSpellings.join(', ')}</p>
                <p>Native Name ({Object.keys(country.name.nativeName)[0]}): {Object.values(country.name.nativeName)[0].official}</p>
                <p>Capital: {country.capital.join(', ')}</p>
                <p>Region: {country.region}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Languages: {Object.values(country.languages).join(', ')}</p>
                {!!country.borders && <p>Borders: {country.borders.join(', ')}</p>}
                <p>Top Level Domain: {country.tld.join(', ')}</p>
                <p>Independent: {country.independent}</p>
                <p>Status: {country.status}</p>
                
            </div>
            <div>
                <h2>Flag</h2>
                <img src={country.flags.png} alt={country.flags.alt} />
                <p>{country.flags.alt}</p>
            </div>
            {!!country.coatOfArms && <div>
                <h2>Coat of Arms</h2>
                <img src={country.coatOfArms.png} alt={country.name.common + ' coat of arms'} />
            </div>}
        </>}
    </div>;
}

export default CountryDetails;