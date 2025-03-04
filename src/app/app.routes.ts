import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CourseComponent } from './pages/course/course.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogue', component: ProductListComponent },
  { path: 'produit/:slug', component: ProductDetailComponent },
  { path: 'panier', component: CartComponent },
  { path: 'nos-cours', component: CourseComponent },
  { path: 'nos-bonsais', component: ProductListComponent },

  // {path: '**', component: NotFoundComponent},
];
