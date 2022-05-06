import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { GeneralComponentsModule } from './_core/modules/general-components/general-components.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import en from '@angular/common/locales/en';
registerLocaleData(en);
import es from '@angular/common/locales/es';
registerLocaleData(es);
import de from '@angular/common/locales/de';
registerLocaleData(de);

import { NZ_I18N, en_US, es_ES, de_DE ,NzI18nService } from 'ng-zorro-antd/i18n';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    GeneralComponentsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES
    // useFactory: (localId: string) => {
    //   switch (localId) {
    //     case 'en':
    //       return en_US;
    //     /** keep the same with angular.json/i18n/locales configuration **/
    //     case 'es':
    //       return es_ES;
    //     default:
    //       return es_ES;
    //   }
    // },
    // deps: [LOCALE_ID]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(/*public i18n: NzI18nService*/) {
    // this.i18n.setLocale(es_ES);
  }

  // this.i18n.setDateLocale(ja)
  // switchLanguage() {
  //   this.i18n.setLocale(en_US);
  // }
}
