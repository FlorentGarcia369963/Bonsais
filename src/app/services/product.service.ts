import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductCard } from '../models/product-card';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'assets/data/catalog.json';

  getProductBySlug(slug: string): Observable<ProductCard | undefined> {
    return this.http
      .get<ProductCard[]>(this.apiUrl)
      .pipe(
        map((products: ProductCard[]) =>
          products.find((product) => product.slug === slug)
        )
      );
  }
}
