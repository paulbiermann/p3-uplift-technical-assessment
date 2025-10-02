import { render, screen, waitFor } from '@testing-library/react';
import CountryList from './CountryList';
import { getCountries } from '../../services/CountryService';
import { Country } from '../../entities/types';
import { MemoryRouter } from 'react-router';

jest.mock('../../services/CountryService');
const mockGetCountries = getCountries as jest.MockedFunction<typeof getCountries>;

const mockCountries: Country[] = [
    {
        "flags": {
            "png": "https://flagcdn.com/w320/ph.png",
            "svg": "https://flagcdn.com/ph.svg",
            "alt": "The flag of Philippines is composed of two equal horizontal bands of blue and red, with a white equilateral triangle superimposed on the hoist side of the field. This triangle has its base on the hoist end, spans about two-fifth the width of the field and bears a central golden-yellow sun with eight rays and a five-pointed golden-yellow star at each vertex."
        },
        "name": {
            "common": "Philippines",
            "official": "Republic of the Philippines",
            "nativeName": {
                "eng": {
                    "official": "Republic of the Philippines",
                    "common": "Philippines"
                },
                "fil": {
                    "official": "Republic of the Philippines",
                    "common": "Pilipinas"
                }
            }
        },
        "capital": [
            "Manila"
        ],
        "region": "Asia",
        "population": 109581085,
        "cca3": "PHL"
    },
    {
        "flags": {
            "png": "https://flagcdn.com/w320/tz.png",
            "svg": "https://flagcdn.com/tz.svg",
            "alt": "The flag of Tanzania features a yellow-edged black diagonal band that extends from the lower hoist-side corner to the upper fly-side corner of the field. Above and beneath this band are a green and light blue triangle respectively."
        },
        "name": {
            "common": "Tanzania",
            "official": "United Republic of Tanzania",
            "nativeName": {
                "eng": {
                    "official": "United Republic of Tanzania",
                    "common": "Tanzania"
                },
                "swa": {
                    "official": "Jamhuri ya Muungano wa Tanzania",
                    "common": "Tanzania"
                }
            }
        },
        "capital": [
            "Dodoma"
        ],
        "region": "Africa",
        "population": 59734213,
        "cca3": "TZA"
    }
];


describe('CountriesList Test', () => {
    it('should call CountryService.getCountries', async () => {
        mockGetCountries.mockResolvedValueOnce(mockCountries);
        render(
            <MemoryRouter>
                <CountryList />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(mockGetCountries).toHaveBeenCalledTimes(1);
        });
    });

    it('should render a list of country cards', async() => {
        mockGetCountries.mockResolvedValueOnce(mockCountries);
        render(
            <MemoryRouter>
                <CountryList />
            </MemoryRouter>
        );
        expect(await screen.findByText(mockCountries[0].name.common)).toBeInTheDocument();
        expect(await screen.findByText(mockCountries[1].name.common)).toBeInTheDocument();
    });

    it('should render a loading spinner', async() => {
        mockGetCountries.mockImplementationOnce(
            () => new Promise(() => {}) // never resolves
        );
        render(
            <MemoryRouter>
                <CountryList />
            </MemoryRouter>
        );
        expect(await screen.findByText('Loading...')).toBeInTheDocument();
    });

    it('should render an error message', async() => {
        mockGetCountries.mockRejectedValueOnce(new Error(''));
        render(
            <MemoryRouter>
                <CountryList />
            </MemoryRouter>
        );
        expect(await screen.findByText('There was an error loading country information. Try refreshing the page.')).toBeInTheDocument();
    });
});
