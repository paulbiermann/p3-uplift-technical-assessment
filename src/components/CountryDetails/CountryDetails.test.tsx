import { render, screen } from '@testing-library/react';
import CountryDetails from './CountryDetails';
import { Country } from '../../entities/types';

const url = 'https://restcountries.com/v3.1/alpha/USA';
const mockCountry: Country = {
    "flags": {
        "png": "https://flagcdn.com/w320/us.png",
        "svg": "https://flagcdn.com/us.svg",
        "alt": "The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton."
    },
    "name": {
        "common": "United States",
        "official": "United States of America",
        "nativeName": {
            "eng": {
                "official": "United States of America",
                "common": "United States"
            }
        }
    },
    "capital": [
        "Washington, D.C."
    ],
    "region": "Americas",
    "population": 329484123,
    "cca3": "USA",
};

describe('CountryDetails test', () => {
    it('renders placeholder', () => {
        render(<CountryDetails/>);
        const linkElement = screen.getByText('CountryDetails Place Holder');
        expect(linkElement).toBeInTheDocument();
    });

    it('')
});