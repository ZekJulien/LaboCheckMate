import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, DOCUMENT } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
registerLocaleData(localeFr);

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChipModule } from 'primeng/chip';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    ChipModule,
    MessagesModule,
    MessageModule,  
    ToastModule
  ],
  providers: [{provide : LOCALE_ID, useValue : 'fr-BE'}, 
   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
