import config from '@/config';
import { IOverpassResponse, Restaurant } from '@/interfaces/IOverpass';
import events from '@/subscribers/events';
import axios from 'axios';
import { EventDispatcher } from 'event-dispatch';
import { Container, Service } from 'typedi';

@Service()
export default class RestaurantService {
  private eventDispatcher: EventDispatcher;
  private overpassUrl: string;

  constructor() {
    this.overpassUrl = config.overpassUrl;
    this.eventDispatcher = Container.get('eventDispatcher');
  }

  public async getRestaurantsByCity(
    userId: string,
    city: string
  ): Promise<Restaurant[]> {
    const query = `
      [out:json];
      area[name="${city}"][admin_level=6][boundary=administrative];
      (
        node[amenity=restaurant](area);
        way[amenity=restaurant](area);
      );
      out center;
    `;

    try {
      const response = await axios.get<IOverpassResponse>(this.overpassUrl, {
        params: { data: query },
      });

      // Emitir evento de consulta de restaurantes
      setImmediate(() => {
        this.eventDispatcher.dispatch(events.restaurant.consult, userId);
      });

      return response.data.elements.map(element => ({
        name: element.tags?.name || 'Unnamed Restaurant',
        lat: element.lat || element.center?.lat,
        lon: element.lon || element.center?.lon,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch restaurants: ${error.message}`);
      }
      throw new Error('Failed to fetch restaurants: Unknown error');
    }
  }
}
