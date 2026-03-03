import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule,
    MatMenuModule, RouterLinkWithHref],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css'],
})

export class Sidenav {

  menuNav = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Categorías', route: 'category', icon: 'category' },
    { name: 'Productos', route: 'product', icon: 'production_quantity_limits' },
  ]

  mobileQuery: MediaQueryList;
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
