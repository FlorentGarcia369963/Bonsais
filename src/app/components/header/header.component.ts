import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuLink } from '../../models/menu-link';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuLinks: MenuLink[] = [
    { title: 'Accueil', link: '/' },
    { title: 'Catalogue', link: '/catalogue' },
    { title: 'Panier', link: '/panier' },
  ];
}
