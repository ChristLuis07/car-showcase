import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
        'x-rapidapi-key': '900104580fmsh219da0b70e3bf40p11b4b7jsnd50ab9832c59',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    };

const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit={limit}&fuel_type=${fuel}`, {
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
  
  export const generateCarImageUrl = (car: CarProps, angle?: string) => { 
    const url = new URL("https://cdn.imagin.studio/getimage"); 
    const { make, model, year } = car; 
    url.searchParams.append("customer", "img"); 
    url.searchParams.append("make", make); 
    url.searchParams.append("modelFamily", model.split(" ")[0]); 
    url.searchParams.append("zoomType", "fullscreen"); 
    url.searchParams.append("modelYear", `${year}`);
    
    if (angle) {
        url.searchParams.append("angle", angle);
      }

    return `${url}`;
  };

  export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    return newPathname;
  }