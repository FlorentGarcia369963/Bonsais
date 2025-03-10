import {
  afterNextRender,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../models/product-card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private isBrowser!: boolean;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  productSlug: string | null = null;
  initialProduct = {
    id: 0,
    title: 'string',
    image: 'string',
    slug: 'string',
    latinName: 'string',
    style: 'string',
    price: 0,
    age: 0,
    description: 'string',
  };
  product = signal<ProductCard>(this.initialProduct);
  isInCart = signal<boolean>(false);

  ngOnInit(): void {
    //Get slug from URL and load the product data
    this.route.paramMap.subscribe((params) => {
      this.productSlug = params.get('slug');
      if (this.productSlug) {
        this.loadProduct(this.productSlug);
      }
    });
  }

  loadProduct(slug: string): void {
    // Call the method in cartService to fetch data
    this.productService.getProductBySlug(slug).subscribe({
      next: (product: ProductCard | undefined) => {
        if (product) {
          // Stock data in a signal
          this.product.set(product);
          // Load the cart after arriving in the browser
          if (this.isBrowser && this.product()) {
            this.cartService.loadCart();
            // Verify if the actual product is already in the cart and stock the answer in a signal
            this.isInCart.set(
              this.cartService
                .cart()
                .some((item) => item.id === this.product().id)
            );
          }
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
      },
      complete: () => {
        console.log('Chargement réussi', this.product());
      },
    });
  }
  addToCart(product: ProductCard) {
    // Add the actual product in the cart and stock the information in the signal
    this.cartService.addToCart(product);
    this.isInCart.set(true);
  }

  removeFromCart(product: ProductCard) {
    // Remove the actual product in the cart and stock the information in the signal

    this.cartService.removeFromCart(product);
    this.isInCart.set(false);
  }
}
