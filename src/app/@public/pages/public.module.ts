import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from '@shop-core/components/header/header.component';
import { NavbarComponent } from '@shop-core/components/navbar/navbar.component';
import { FooterComponent } from '@shop-core/components/footer/footer.component';
import { ShoppingCartModule } from '@shop/core/components/shopping-cart/shopping-cart.module';


//TRADUCTOR
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { FormsModule } from '@angular/forms';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}
//FIN TRADUCTOR


@NgModule({
  declarations: [PublicComponent, HeaderComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ShoppingCartModule,
    // TRADUCTOR
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    }),
    FormsModule
  ]
})
export class PublicModule { }
