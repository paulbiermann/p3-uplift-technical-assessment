import React, { useCallback } from "react";
import CountryCard from "../CountryCard/CountryCard";
import { Country } from "../../entities/types";
import { getCountries } from "../../services/CountryService";
import styles from "./CountryList.module.css"

const PAGE_SIZE = 20;

const CountryList: React.FC = () => {
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [displayedCountries, setDisplayedCountries] = React.useState<Country[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        const fetchCountries = async() => {
            setLoading(true);
            setError(false);

            try {
                const countries = await getCountries();
                setCountries(countries);
                setDisplayedCountries(countries.slice(0,20));
                setHasMore(displayedCountries.length < countries.length)
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCountries();
    }, []);

    /*
    Note: Pagination or Infinite Scroll usually make use of pagination on the server side.
    Because our endpoint doesn't have pagination, all pagination is implemented on the front end.
    */
    const loadMore = React.useCallback(() => {
        setDisplayedCountries(prev => {
            const nextLen = Math.min(prev.length + PAGE_SIZE, countries.length);
            if (nextLen === prev.length) return prev;
            return countries.slice(0, nextLen);
        })
    }, [countries]);

    const observer = React.useRef<IntersectionObserver | null>(null);
    const bottomSentinelRef = React.useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        if (typeof IntersectionObserver === "undefined") return;

        observer.current = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                if (entry?.isIntersecting && hasMore) {
                    loadMore();
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0.1
            }
        );
        if (node) observer.current.observe(node);
    }, [[loading, hasMore, loadMore]])

    return <div className={styles['country-list-container']}>
        <h2>Countries</h2>
        
        {error && <div className={styles['error-message']}>There was an error loading country information. Try refreshing the page.</div>}
        {displayedCountries.map((country, index) => <CountryCard country={country} key={index}/>)}
        {loading && <div className={styles['loading-spinner']}>Loading...</div>}
        {!loading && hasMore && <div ref={bottomSentinelRef} style={{height: 1}} />}
    </div>
}

export default CountryList;