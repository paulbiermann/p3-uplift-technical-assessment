import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';
import { Country } from '../../entities/types';

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
    "cca3": "USA"
};

describe('CountryCard test', () => {
    it('renders country name', () => {
        render(<CountryCard country={mockCountry}/>);
        const linkElement = screen.getByText(new RegExp(mockCountry.name.common));
        expect(linkElement).toBeInTheDocument();
    });

    it('renders the country flag', () => {
        render(<CountryCard country={mockCountry}/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', mockCountry.flags.svg);
        expect(img).toHaveAttribute('alt', mockCountry.flags.alt);
    });

    it('renders the country population', () => {
        render(<CountryCard country={mockCountry}/>);
        const populationElement = screen.getByText(
            new RegExp(`Population: ${mockCountry.population}`)
        );
        expect(populationElement).toBeInTheDocument();
    });

    it('renders the country region', () => {
        render(<CountryCard country={mockCountry}/>);
        const regionElement = screen.getByText(
            new RegExp(`Region: ${mockCountry.region}`)
        );
        expect(regionElement).toBeInTheDocument();
    });

    it('renders the country capital', () => {
        render(<CountryCard country={mockCountry}/>);
        const capitalElement = screen.getByText(
            new RegExp(`Capital: ${mockCountry.capital.join(', ')}`)
        );
        expect(capitalElement).toBeInTheDocument();
    });
});
