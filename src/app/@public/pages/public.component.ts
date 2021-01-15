import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  selectedLanguage = 'es';
  constructor(private auth: AuthService, private translate: TranslateService) {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
   }

  ngOnInit(): void {
    this.auth.start();
  }

}
