import { render, screen, waitFor } from '@testing-library/react';
import CountryList from './CountryList';
import { getCountries } from '../../services/CountryService';
import { Country } from '../../entities/types';

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
        "population": 109581085
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
        "population": 59734213
    }
];


describe('CountriesList Test', () => {
    it('should call CountryService.getCountries', async () => {
        mockGetCountries.mockResolvedValueOnce(mockCountries);
        render(<CountryList />);
        await waitFor(() => {
            expect(mockGetCountries).toHaveBeenCalledTimes(1);
        });
    });
});
