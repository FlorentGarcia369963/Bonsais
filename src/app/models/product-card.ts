import { HomeInfoCard } from './home-info-card';

export interface ProductCard extends HomeInfoCard {
  latinName: string;
  style: string;
  price: number;
  age: number;
  description: string;
}
