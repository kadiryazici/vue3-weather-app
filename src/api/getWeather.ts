import { API_KEY } from '/consts';
import { Weather } from '/src/api/types';

export async function getWeather(city: string): Promise<Weather> {
   const encoded = encodeURIComponent(city);
   const req = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encoded}&appid=${API_KEY}&units=metric`,
      {
         headers: {
            Accept: 'application/json'
         }
      }
   );
   return (await req.json()) as Weather;
}
