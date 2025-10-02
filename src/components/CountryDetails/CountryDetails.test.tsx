import { render, screen, waitFor } from '@testing-library/react';
import CountryDetails from './CountryDetails';
import { Country, CountryFullDetails } from '../../entities/types';
import { getCountryByCCA3 } from '../../services/CountryService';
import { MemoryRouter, Route, Routes } from 'react-router';

const url = 'https://restcountries.com/v3.1/alpha/USA';

jest.mock('../../services/CountryService');
const mockGetCountryByCCA3 = getCountryByCCA3 as jest.MockedFunction<typeof getCountryByCCA3>;

const mockCountryFullDetails: CountryFullDetails = {
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
        "tld": [
            ".us"
        ],
        "cca2": "US",
        "ccn3": "840",
        "cioc": "USA",
        "independent": true,
        "status": "officially-assigned",
        "unMember": true,
        "currencies": {
            "USD": {
                "symbol": "$",
                "name": "United States dollar"
            }
        },
        "idd": {
            "root": "+1",
            "suffixes": [
                "201"
            ]
        },
        "capital": [
            "Washington, D.C."
        ],
        "altSpellings": [
            "US",
            "USA",
            "United States of America"
        ],
        "region": "Americas",
        "subregion": "North America",
        "languages": {
            "eng": "English"
        },
        "latlng": [
            38.0,
            -97.0
        ],
        "landlocked": false,
        "borders": [
            "CAN",
            "MEX"
        ],
        "area": 9372610.0,
        "demonyms": {
            "eng": {
                "f": "American",
                "m": "American"
            },
            "fra": {
                "f": "Américaine",
                "m": "Américain"
            }
        },
        "cca3": "USA",
        "flag": "🇺🇸",
        "maps": {
            "googleMaps": "https://goo.gl/maps/e8M246zY4BSjkjAv6",
            "openStreetMaps": "https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8"
        },
        "population": 329484123,
        "gini": {
            "2018": 41.4
        },
        "fifa": "USA",
        "car": {
            "signs": [
                "USA"
            ],
            "side": "right"
        },
        "timezones": [
            "UTC-12:00",
            "UTC-11:00",
            "UTC-10:00",
            "UTC-09:00",
            "UTC-08:00",
            "UTC-07:00",
            "UTC-06:00",
            "UTC-05:00",
            "UTC-04:00",
            "UTC+10:00",
            "UTC+12:00"
        ],
        "continents": [
            "North America"
        ],
        "flags": {
            "png": "https://flagcdn.com/w320/us.png",
            "svg": "https://flagcdn.com/us.svg",
            "alt": "The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton."
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/us.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/us.svg"
        },
        "startOfWeek": "sunday",
        "capitalInfo": {
            "latlng": [
                38.89,
                -77.05
            ]
        },
        "postalCode": {
            "format": "#####-####",
            "regex": "^\\d{5}(-\\d{4})?$"
        }
    };

describe('CountryDetails test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders country official name', async () => {
        mockGetCountryByCCA3.mockResolvedValueOnce(mockCountryFullDetails);
        render(
            <MemoryRouter initialEntries={['/country/USA']}>
                <Routes>
                    <Route path="/country/:cca3" element={<CountryDetails />} />
                </Routes>
            </MemoryRouter>
        );

        const heading = await screen.findByRole('heading', {
            name: mockCountryFullDetails.name.official,
        });
        expect(heading).toBeInTheDocument();
    });

    it('should call CountryService.getCountryByCCA3', async () => {
        mockGetCountryByCCA3.mockResolvedValueOnce(mockCountryFullDetails);
        render(
            <MemoryRouter initialEntries={['/country/USA']}>
                <Routes>
                    <Route path="/country/:cca3" element={<CountryDetails />} />
                </Routes>
            </MemoryRouter>
        );
            
        await waitFor(() => expect(mockGetCountryByCCA3).toHaveBeenCalledTimes(1));
    });
});