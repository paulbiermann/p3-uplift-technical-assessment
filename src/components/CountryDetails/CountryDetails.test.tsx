import { render, screen, waitFor } from '@testing-library/react';
import CountryDetails from './CountryDetails';
import { Country } from '../../entities/types';
import { getCountryByCCA3 } from '../../services/CountryService';
import { MemoryRouter, Route, Routes } from 'react-router';

const url = 'https://restcountries.com/v3.1/alpha/USA';

jest.mock('../../services/CountryService');
const mockGetCountryByCCA3 = getCountryByCCA3 as jest.MockedFunction<typeof getCountryByCCA3>;

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
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders country official name', async () => {
        mockGetCountryByCCA3.mockResolvedValueOnce(mockCountry);
        render(
            <MemoryRouter initialEntries={['/country/USA']}>
                <Routes>
                    <Route path="/country/:cca3" element={<CountryDetails />} />
                </Routes>
            </MemoryRouter>
        );

        const heading = await screen.findByRole('heading', {
            name: mockCountry.name.official,
        });
        expect(heading).toBeInTheDocument();
    });

    it('should call CountryService.getCountryByCCA3', async () => {
        mockGetCountryByCCA3.mockResolvedValueOnce(mockCountry);
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