export async function fetchCars() {
    const headers = {
        'x-rapidapi-key': 'e6db794646msh85e6f14d9e3a399p152c28jsn74c5b3a07391',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    };

const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera', {
    method: 'GET',
    headers: headers,
});

const result = await response.json();

return result
}

export const calculateCarRent = (city_mpg: number, year: number): number => {
    if (!city_mpg || !year) return 0;
  
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
  
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    return Math.floor(basePricePerDay + mileageRate + ageRate);
  };
  