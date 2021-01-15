import { optionsWithDetails } from '@shared/alerts/alerts';
import { ICart } from '@shop/core/components/shopping-cart/shoppin-cart.interface';
import { IMenuItem } from '@core/interfaces/menu-item.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IMeData } from '@core/interfaces/session.interface';
import shopMenuItems from '@data/menus/shop.json';
import { CartService } from '@shop/core/services/cart.service.ts.service';
import { REDIRECTS_ROUTES } from '@core/constants/config';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartItemsTotal: number;
  menuItems: Array<IMenuItem> = shopMenuItems;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  selectedLanguage = 'es';
  constructor(private authService: AuthService, private cartService: CartService,  private translate: TranslateService,
              private router: Router) {
    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });

    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cartItemsTotal = data.subtotal;
      }
    });
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.cartItemsTotal = this.cartService.initialize().subtotal;
  }

  open() {
    console.log('navbar open cart');
    this.cartService.open();
  }

  async logout() {
    this.authService.resetSession(this.router.url);
  }
  toogleLanguage(lang: string) {
    this.translate.use(lang);
    console.log(lang);
    //implementar cambio de lenguaje

  }

}
