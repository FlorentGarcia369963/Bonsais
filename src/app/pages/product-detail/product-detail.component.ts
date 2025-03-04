import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../models/product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  productSlug: string | null = null;
  product: ProductCard | undefined = undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productSlug = params.get('slug');
      if (this.productSlug) {
        this.loadProduct(this.productSlug);
      }
    });
  }

  loadProduct(slug: string): void {
    console.log(this.productSlug);
    this.productService.getProductBySlug(slug).subscribe({
      next: (product: ProductCard | undefined) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error loading product:', error);
      },
      complete: () => {
        console.log('Chargement réussi', this.product);
      },
    });
  }
}
