import { Component, OnInit } from '@angular/core';
import { HomeInfoCard } from '../../models/home-info-card';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../models/product-card';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  infoCards: HomeInfoCard[] = [];

  selectionCards: ProductCard[] = [];

  ngOnInit(): void {
    forkJoin({
      infoCards: this.http.get<HomeInfoCard[]>('assets/data/info-card.json'),
      selectionCards: this.http.get<ProductCard[]>(
        'assets/data/selection-card.json'
      ),
    }).subscribe(
      (data: { infoCards: HomeInfoCard[]; selectionCards: ProductCard[] }) => {
        this.infoCards = data.infoCards;
        this.selectionCards = data.selectionCards;
      }
    );
  }
}
