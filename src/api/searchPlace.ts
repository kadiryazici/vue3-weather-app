import { LocationSearch } from '/src/api/types';

export async function searchPlace(query: string) {
   const req = await fetch('https://places-dsn.algolia.net/1/places/query', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         query: query,
         hitsPerPage: 10,
         language: 'en'
         // type: 'city'
      })
   });
   const data: LocationSearch = await req.json();
   return data;
}
