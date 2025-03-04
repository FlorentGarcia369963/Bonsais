import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../../models/product-card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  catalogCards: ProductCard[] = [];
  ngOnInit(): void {
    this.http
      .get<ProductCard[]>('assets/data/catalog.json')
      .subscribe((data) => (this.catalogCards = data));
  }
}
