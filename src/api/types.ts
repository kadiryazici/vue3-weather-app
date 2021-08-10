interface HitsResponse {
   country: string;
   is_country: boolean;
   is_highway: boolean;
   importance: number;
   _tags: string[];
   postcode: string[];
   county: string[];
   population: number;
   country_code: string;
   is_city: boolean;
   is_popular: boolean;
   administrative: string[];
   admin_level: number;
   is_suburb: boolean;
   locale_names: string[];
   _geoloc: {
      lat: number;
      lng: number;
   };
   objectID: string;
   _highlightResult: {
      country: {
         value: string;
         matchLevel: string;
         matchedWords: string[];
      };
      postcode: [
         {
            value: string;
            matchLevel: string;
            matchedWords: string[];
         }
      ];
      county: [
         {
            value: string;
            matchLevel: string;
            matchedWords: string[];
         }
      ];
      administrative: [
         {
            value: string;
            matchLevel: string;
            fullyHighlighted: boolean;
            matchedWords: string[];
         }
      ];
      locale_names: [
         {
            value: string;
            matchLevel: string;
            fullyHighlighted: boolean;
            matchedWords: string[];
         },
         {
            value: string;
            matchLevel: string;
            matchedWords: string[];
         },
         {
            value: string;
            matchLevel: string;
            matchedWords: string[];
         }
      ];
   };
}

export interface LocationSearch {
   hits: HitsResponse[];
   nbHits: number;
   processingTimeMS: number;
   query: string;
   params: string;
   degradedQuery: boolean;
}

export interface Weather {
   coord: {
      lon: number;
      lat: number;
   };
   weather: [
      {
         id: number;
         main: string;
         description: string;
         icon: string;
      }
   ];
   base: string;
   main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
   };
   visibility: number;
   wind: {
      speed: number;
      deg: number;
      gust: number;
   };
   clouds: {
      all: number;
   };
   dt: number;
   sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
   };
   timezone: number;
   id: number;
   name: string;
   cod: number;
}
