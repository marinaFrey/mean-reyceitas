import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MaterialModule } from './features/shared/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/http.interceptor';
import { ApiService } from './core/services/api.service';
import { AuthService } from '@services/auth.service';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { CookieModule } from 'ngx-cookie';
import { AlertService } from '@services/alert.service';
import { AlertComponent } from './core/components/alert/alert.component';
import { firstValueFrom } from 'rxjs';
import { BannerComponent } from './core/components/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlertComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    CookieModule.withOptions()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: RequestInterceptor, 
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    ApiService,
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function appInitializer(authService: AuthService) {
  return () => new Promise(resolve => {
      return firstValueFrom(authService.checkTokenValidation()).then(resolve);
  });
}