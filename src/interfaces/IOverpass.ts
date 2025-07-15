// Respuesta principal de Overpass API
export interface IOverpassResponse {
  version: number;
  generator: string;
  osm3s: OSM3S;
  elements: OverpassElement[];
}

interface OSM3S {
  timestamp_osm_base: string;
  copyright: string;
}

// Elemento individual (restaurante)
interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number; // Solo para type: 'node'
  lon?: number; // Solo para type: 'node'
  center?: Center; // Solo para type: 'way'
  tags: Tags;
}

interface Center {
  lat: number;
  lon: number;
}

// Tags/etiquetas del restaurante
interface Tags {
  amenity: 'restaurant';
  name?: string;
  cuisine?: string;
  'addr:street'?: string;
  'addr:housenumber'?: string;
  'addr:city'?: string;
  'addr:postcode'?: string;
  phone?: string;
  website?: string;
  opening_hours?: string;
  wheelchair?: 'yes' | 'no' | 'limited';
  outdoor_seating?: 'yes' | 'no';
  takeaway?: 'yes' | 'no';
  delivery?: 'yes' | 'no';
  email?: string;
  facebook?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

// Interfaz simplificada para tu API
export interface Restaurant {
  name: string;
  lat?: number;
  lon?: number;
}

// Respuesta de tu endpoint
export interface IRestaurantResponse {
  city: string;
  count: number;
  restaurants: Restaurant[];
}
