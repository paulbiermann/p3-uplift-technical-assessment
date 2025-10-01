import { getCountries } from './CountryService';
import { Country } from '../entities/types';

const url = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital';
const mockCountries: Country[] = [
    {
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
        "population": 329484123
    }
];

describe('CountryService.getCountries test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('calls the restcountries all endpoint', async() => {
        (global as any).fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockCountries)
        });

        await getCountries();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(url);
    })
});
