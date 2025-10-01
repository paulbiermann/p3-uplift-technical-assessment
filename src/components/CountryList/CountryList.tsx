import React from "react";
import CountryCard from "../CountryCard/CountryCard";
import { Country } from "../../entities/types";
import { getCountries } from "../../services/CountryService";

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

    return <div>
        {countries.map(country => <CountryCard country={country} key={country.name.common} />)}
    </div>
}

export default CountryList;