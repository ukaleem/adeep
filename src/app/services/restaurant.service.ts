import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private resturantsOrgArray: Restaurant[] = [
    new Restaurant(
      '1',
      'isTurk',
      'Carretera de Almería, 144Benajarafe, Málaga, 29738',
      'Po122',
      'https://www.isturkkebab.com/wp-content/uploads/2019/02/IMG-20190223-WA0005.jpg'
    ),
    new Restaurant(
      '2',
      'Au iDe la Aurora',
      'Av.De la Aurora 59 Malaga, 29006',
      '29006',
      'https://www.isturkkebab.com/wp-content/uploads/2019/02/IMG-20190222-WA0040.jpg'
    ),
    new Restaurant(
      '3',
      'Malaga Avenue 111',
      'Av. Malaga 111, La Cala del Moral Malaga, 29720',
      '29720',
      'https://www.isturkkebab.com/wp-content/uploads/2019/02/pizza.png'
    )
  ];

  get getRestaurants() {
    return [...this.resturantsOrgArray];
  }

  constructor() {}

  getRestaurantsById(id: string) {
    return{...this.resturantsOrgArray.find(res => res.resId === id)};
  }
}
